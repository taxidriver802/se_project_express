const express = require('express');

const { PORT = 3001 } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});