const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index.js");

const { PORT = 3001 } = process.env;
const app = express();

const routes = require("./routes");
app.use(express.json());
app.use(routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB", err);
  });

app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.send("Hello App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
