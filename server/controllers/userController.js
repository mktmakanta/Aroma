const User = require('../models/User');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// filter object for update me user
const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (!allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return obj;
};

exports.topUsers = (req, res, next) => {
  req.query.limit = '4';
  req.query.sort = 'name,role';
  req.query.fields = 'name,email,bio';
  next();
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const userFeatures = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await userFeatures.query;
  res.status(200).json({
    status: 200,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User with that ID doesn't exist", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("User with that ID doesn't exist", 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: {
      user,
    },
  });
});

// DELETE HANDLER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return next(
      new AppError("User with that ID doesn't exist, could not delete", 404)
    );
  }
  res.status(204).json({
    status: 'success',
    message: 'User deleted successfully',
    data: null,
  });
});

// GET ME
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    '-passwordChangedAt -createdAt -updatedAt '
  );

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// UPDATE CURRENT USER PROFILE(UPDATE ME)
exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-my-password.',
        400
      )
    );
  }
  const filteredBody = filteredObj(req.body, 'name', 'email', 'bio');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// DELETE CURRENT USER (DELETE ME)
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
