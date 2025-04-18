const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./utils/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB"); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error("Error connecting to DB", err); // eslint-disable-line no-console
  });

app.listen(PORT, () => {
  console.log(`PORT environment variable: ${process.env.PORT}`); // eslint-disable-line no-console
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line no-console
});
