const authService = require('../services/auth.service');

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    await authService.generateOtp(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    const token = await authService.login(email, otp);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
};