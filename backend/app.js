const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const taskRouter = require("./routers/taskRouter");
const userRouter = require("./routers/userRouter");

const app = express();

// const limite = rateLimit({
//     windowMs:60*60*1000,
//     message : "to many request come from this IP address try after 1 hours"
// })

app.use(helmet());
app.use(cors());

if (process.env.ENV == "dev") app.use(morgan("dev"));

// app.use("/task",limite);
// app.use("/user",limite);

app.use(express.json());
app.use("/task", taskRouter);
app.use("/user", userRouter);


app.all("*", (req, res, next) => {
  const error = new Error(`we can not found ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
  });
});

module.exports = app;
