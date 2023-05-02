import express from 'express';

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})
