const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const cors = require("cors");

const indexRouter = require("./routes/index");
const itemsRouter = require("./routes/items");
const usersRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
s;
app.post("/users/signin", login);
app.post("/users/signup", createUser);
app.use("/items", itemsRouter);

app.use(auth);

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line no-console
});
