const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = req.body;

  // Only allow specific fields to be set
  const user = await User.create({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    confirmPassword: newUser.confirmPassword,
  });

  const token = signToken(user._id);

  // Exclude password fields from response
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.confirmPassword;

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    token,
    user: userResponse,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password, user.password))) {
    const token = signToken(user._id);
    res.json({
      status: 'success',
      message: 'Logged in successfully',
      token,
    });
  } else {
    return next(new AppError('Invalid Email or Password', 401));
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  //verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
    
  }

  req.user = currentUser;
  next();
});
