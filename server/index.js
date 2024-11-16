import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connect from "./lib/connect.js";
import authRouter from "./routes/auth.route.js";
import authMiddleware from "./middleware/auth-middleware.js";
import contactRouter from "./routes/contact.route.js";

const PORT = Number(process.env.PORT) || 8000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", authMiddleware, contactRouter);

app.all("*", (_, res) => {
  res.status(404).json({
    message: "Resource not found",
  });
});

connect()
  .then(app.listen(PORT, () => console.log("Server running on port " + PORT)))
  .catch((err) => {
    console.log("Error Connecting to DB", err?.message);
    process.exit(1);
  });
