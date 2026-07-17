import express from 'express';
import axios from 'axios';
import { Redis } from 'ioredis';
import http from 'node:http';
import { Server } from 'socket.io';
import path from 'node:path';

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8000;

app.use(express.static(path.resolve('./public')));
const state = new Array(1000).fill(false);

const redis = new Redis();
const publisher = new Redis();
const subscriber = new Redis();

const io = new Server();
io.attach(httpServer);

subscriber.subscribe('server:Broker');
subscriber.on('message', (channel, message) => {
  const { event, data } = JSON.parse(message);

  state[data.index] = data.value;
  setInterval(() => {
    const index = Math.floor(Math.random() * state.length);
    const value = Math.random() > 0.5;
    state[index] = value;
    //   io.emit('checkbox-update', data);
    io.emit(event, data); // relay kardo
  }, 20);
});

io.on('connection', (socket) => {
  //   socket.on('user-message', (message) => {
  //     io.emit('message', message);
  //   });

  socket.on('checkbox-update', async (data) => {
    await publisher.publish(
      'server:Broker',
      JSON.stringify({ event: 'checkbox-update', data }),
    );

    // state[data.index] = data.value;
    // setInterval(() => {
    //   const index = Math.floor(Math.random() * state.length);
    //   const value = Math.random() > 0.5;
    //   state[index] = value;
    //   io.emit('checkbox-update', data);
    // }, 20);

  });
});

app.get('/books', async (req, res) => {
  const response = await axios.get(
    'https://api.freeapi.app/api/v1/public/books',
  );
  return res.send(response.data);
});

// ---------- rate-limiting middleware --------------
/*
app.use(async function (req, res, next) {
  const key = 'rate-limit';
  const val = await redis.get(key);

  if (val === null) {
    await redis.set(key, 0);
    await redis.expire(key, 60);
  }

  if (val > 100) {
    return res.status(429).json({ message: 'Too many request' });
  }

  await redis.incr(key);

  next();
});
*/

app.get('/state', (req, res) => {
  return res.json({ state });
});

/*------------ redis concept ----------
app.get('/books/total', async (req, res) => {
  const cachedValue = await redis.get('totalPageCountValue');

  // console.log(cachedValue);

  if (cachedValue) {
    console.log('cache hit');
    return res.json({ cachedValue });
  }

  const response = await axios.get(
    'https://api.freeapi.app/api/v1/public/books',
  );
  const totalPageCount = response?.data?.data?.data?.reduce(
    (acc, curr) =>
      curr.volumeInfo?.pageCount ? curr.volumeInfo?.pageCount + acc : 0,
    0,
  );

  // console.log(totalPageCount);

  await redis.set('totalPageCountValue', totalPageCount);

  console.log('cache miss');

  return res.json({ totalPageCount });
});
*/

app.get('/', (req, res) => {
  res.send({ status: 'success' });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
