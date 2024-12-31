require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

//!middleware
app.use(express.json());

//! Swagger UI Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//! CORS middleware
app.use(cors());

//!routes
app.use("/api/", userRouter);
app.use("/api/", todoRouter);

// !Port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to DB");
    app.listen(port, console.log("server listening in port 5000"));
  } catch (err) {
    console.log(err);
  }
};

start();
