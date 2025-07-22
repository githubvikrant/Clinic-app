export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  const cookieOptions = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    httpOnly: true,
    secure: true, // ⬅️ Required for cross-origin on HTTPS
    sameSite: "None", // ⬅️ Required for cross-origin cookies
    path: "/"
  };

  res
    .status(statusCode)
    .cookie(cookieName, token, cookieOptions)
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
};
