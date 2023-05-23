import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/Logger.js';
// import checkSource from './middlewares/cors';

dotenv.config();

const app = express();

app.use(cors());

// app.use(checkSource);

// const CorsOptions = {
//   origin: ['https://praktikum.tk', 'http://praktikum.tk', 'http://localhost:3000', 'https://custo.students.nomoredomains.monster'],
//   credentials: true,
//   maxAge: 300,
// };

// app.use(cors(CorsOptions));

const { PORT, MONGO_URL } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

async function connect() {
  await mongoose.connect(MONGO_URL, {});
  console.log(`Server connect db ${MONGO_URL}`);

  await app.listen(PORT);
  console.log(`Server listen port ${PORT}`);
}

connect();
