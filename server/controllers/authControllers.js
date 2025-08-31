const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = req.body;

    // const user = await User.create(newUser); // Dont use this method, as other fields like role can be set by user
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
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
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
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'You are not logged in! Please log in to get access.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token no longer exists.',
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
