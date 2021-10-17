// external imports
const express = require("express");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const moment = require("moment");

// internal imports
const { notFoundHandler, errorHandler } = require("./src/middleware/common/errorHandler");
const loginRouter = require("./src/router/loginRouter");
const usersRouter = require("./src/router/usersRouter");
const inboxRouter = require("./src/router/inboxRouter");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log("Database connection error: " + err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// chat application listening at "process.env.PORT"
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log(`Chat application run at http://localhost:${process.env.PORT}`);
  }
});
