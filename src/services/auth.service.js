const db = require('../config/db');
const User = db.User;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dns = require('dns');

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  family: 4,
  localAddress: '0.0.0.0'
});

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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Task Management System',
    text: `Your OTP is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
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
