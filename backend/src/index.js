import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Custom Error Handler Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  // Send structured error response
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is runnnig on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!!", err);
  });

import bookRouter from "./routes/book.route.js";

app.use("/api/v1/books", bookRouter);

