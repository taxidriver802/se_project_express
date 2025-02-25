const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

const routes = require("./routes");

app.use(routes);

app.use("/", indexRouter);

mongoose.set("strictQuery", true); // Add this line to handle the deprecation warning

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
