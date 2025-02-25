import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import { logRequest, logger } from "./middlewares/logger";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(logRequest);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.message);
  res
    .status(500)
    .json({ status: false, data: [], message: "Internal Server Error" });
});

export default app;
