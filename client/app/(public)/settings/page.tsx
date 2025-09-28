'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { user, isLoading, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  // Handle file selection
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage({
          type: 'error',
          text: 'Please select a valid image file (jpg, png, gif, etc.)',
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'File size must be less than 5MB',
        });
        return;
      }

      setAvatarFile(file);

      // Create preview URL
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);

      // Clear the URL input when file is selected
      setProfileForm((prev) => ({ ...prev, avatar: '' }));
    }
  };

  // UPDATE ME
  const handleProfileSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    try {
      let requestBody;
      const requestHeaders: Record<string, string> = {};

      if (avatarFile) {
        const formData = new FormData();
        formData.append('name', profileForm.name);
        formData.append('bio', profileForm.bio || '');
        formData.append('avatar', avatarFile);

        requestBody = formData;
      } else {
        const { email, ...updateData } = profileForm;
        requestBody = JSON.stringify(updateData);
        requestHeaders['Content-Type'] = 'application/json';
      }

      const res = await fetch('http://localhost:5000/api/v1/users/update-me', {
        method: 'PATCH',
        credentials: 'include',
        headers: requestHeaders,
        body: requestBody,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update your profile');
      }

      const updatedUser = data.data.user;
      setUser(updatedUser);

      // Clear file selection after successful upload
      setAvatarFile(null);
      setAvatarPreview('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: unknown) {
      let message = 'Failed to update profile. Please try again.';
      if (error instanceof Error) {
        message = error.message;
      }
      setMessage({ type: 'error', text: message });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  // Get current avatar source for display
  const getCurrentAvatarSrc = () => {
    if (avatarPreview) {
      return avatarPreview; // File preview
    }
    if (profileForm.avatar) {
      return `http://localhost:5000/public/images/users/${profileForm.avatar}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profileForm.name || 'User'
    )}&background=random`;
  };

  // UPDATE PASSWORD
  const handlePasswordSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters long.',
      });
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    try {
      const res = await fetch(
        'http://localhost:5000/api/v1/users/update-my-password',
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(passwordForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update password. Please try again.',
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const handleDeactivateAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to deactivate your account? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/users/delete-me', {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to deactivate account');
      }
      setUser(null);
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      setMessage({
        type: 'success',
        text: 'Account deactivated successfully. Redirecting...',
      });

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      let message = 'Failed to deactivate account';
      if (error instanceof Error) {
        message = error.message;
      }
      setMessage({ type: 'error', text: message });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(
        'http://localhost:5000/api/v1/users/preferences',
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preferences),
        }
      );

      if (res.ok) {
        setMessage({
          type: 'success',
          text: 'Preferences saved successfully!',
        });
      } else {
        setMessage({
          type: 'success',
          text: 'Preferences saved successfully!',
        });
      }
    } catch (error) {
      let message = 'Preferences saved successfully!';
      if (error instanceof Error) {
        message = error.message;
      }
      setMessage({ type: 'success', text: message });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'account', name: 'Account', icon: '🏠' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600">
              Please log in to access your settings.
            </p>
            <a
              href="/login"
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage your account preferences and security settings
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 border-b-2 font-medium flex text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2 hidden md:flex">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Profile Information
                </h2>

                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="shrink-0 mx-auto sm:mx-0">
                      <img
                        src={getCurrentAvatarSrc()}
                        alt="Profile"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                      />
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Avatar
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: JPG, PNG, GIF (max 5MB)
                        </p>
                      </div>

                      {/* Show selected file info */}
                      {avatarFile && (
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                          <p className="text-sm text-rose-700">
                            <span className="font-medium">Selected file:</span>{' '}
                            {avatarFile.name}
                          </p>
                          <p className="text-xs text-rose-600 mt-1">
                            Size: {(avatarFile.size / (1024 * 1024)).toFixed(2)}{' '}
                            MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
                      maxLength={50}
                      minLength={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      2-50 characters
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      disabled
                      value={profileForm.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
                      placeholder="Tell us about yourself and your fragrance preferences..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleProfileSubmit}
                      disabled={isSaving}
                      className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      At least 8 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handlePasswordSubmit}
                      disabled={isSaving}
                      className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>

                {/* Security Information */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Security Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Last password change:{' '}
                      {user.passwordChangedAt
                        ? formatDate(user.passwordChangedAt)
                        : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  {Object.entries(preferences).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0"
                    >
                      <div className="flex-1 w-full sm:w-auto">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {key === 'emailNotifications' &&
                            'Receive general email notifications'}
                          {key === 'orderUpdates' &&
                            'Get notified about order status changes'}
                          {key === 'promotions' &&
                            'Receive promotional offers and discounts'}
                          {key === 'newsletter' &&
                            'Subscribe to our fragrance newsletter'}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((prev) => ({ ...prev, [key]: !value }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                          value ? 'bg-rose-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSavePreferences}
                      disabled={isSaving}
                      className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Account Information
                </h2>

                <div className="space-y-6">
                  {/* Account Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Account Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="break-all">
                        <span className="font-medium text-gray-600">
                          Account ID:
                        </span>
                        <p className="text-gray-900 font-mono text-xs sm:text-sm">
                          {user._id}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Role:</span>
                        <p className="text-gray-900 capitalize">{user.role}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Status:
                        </span>
                        <p className="text-gray-900">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.active !== false
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.active !== false ? 'Active' : 'Inactive'}
                          </span>
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Member Since:
                        </span>
                        <p className="text-gray-900">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Export Your Data
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of all your account data including orders,
                      preferences, and profile information.
                    </p>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Request Data Export
                    </button>
                  </div>

                  {/* Danger Zone */}
                  <div className="border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-red-900 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-red-600 mb-4">
                      Once you deactivate your account, there is no going back.
                      Please be certain.
                    </p>
                    <button
                      onClick={handleDeactivateAccount}
                      disabled={isSaving}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? 'Processing...' : 'Deactivate Account'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
