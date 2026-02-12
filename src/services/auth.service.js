const db = require('../config/db');
const User = db.User;
const jwt = require('jsonwebtoken');

exports.generateOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  let user = await User.findOne({ where: { email } });
  if (!user) {
    user = await User.create({ email, otp, otpExpires });
  } else {
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
  }

  return otp;
};

exports.login = async (email, otp) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    throw new Error('Invalid OTP or OTP has expired.');
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return token;
};
