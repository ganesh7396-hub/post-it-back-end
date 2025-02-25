import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
