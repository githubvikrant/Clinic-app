import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `✅ Server is running at ${
      process.env.NODE_ENV === "production"
        ? "on production server"
        : `http://localhost:${PORT}`
    }`
  );
});
