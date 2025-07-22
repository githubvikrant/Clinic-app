import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// 🔐 Admin Authentication Middleware
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin user is not authenticated!", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user || user.role !== "Admin") {
    return next(new ErrorHandler("Not authorized as Admin!", 403));
  }

  req.user = user;
  next();
});

// 👤 Patient Authentication Middleware
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.patientToken;

  if (!token) {
    return next(new ErrorHandler("Patient user is not authenticated!", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user || user.role !== "Patient") {
    return next(new ErrorHandler("Not authorized as Patient!", 403));
  }

  req.user = user;
  next();
});

// 🎯 Role-based Authorization Middleware
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user?.role || "Unknown"} not allowed to access this resource!`,
          403
        )
      );
    }
    next();
  };
};
