require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//database
const connectDB = require("./db/connect");
// routes
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
//app.use(cors())

app.get("/", (req, res) => {
  res.send("ApproAlternative api");
});
app.get("/api/v1", (req, res) => {
  res.send("ApproAlternative api");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
