import express from 'express';
import makeStoppable from 'stoppable';
import http from 'http';
import passport from 'passport';
import cors from 'cors';
import { Server } from 'socket.io';
import { Client } from '@elastic/elasticsearch';

import router from './src/routes/router.js';
import sequelize from './src/config/database.js';
import { localStrategy } from './src/passport/localStrategy.js';
import { jwtStrategy } from './src/passport/jwtStrategy.js';
import { loadModels } from './src/models/loadModels.js';
import config from './config.js';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://collectify-2d8002ccdfaa.herokuapp.com',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST'],
  },
});

const client = new Client({
  node: config.elasticNode,
  auth: {
    apiKey: config.elasticApiKey,
  },
});

app.set('socketio', io);
app.set('client', client);

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

passport.use('login', localStrategy);
passport.use('jwt', jwtStrategy);

loadModels();

app.use('/', router);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err });
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {});
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized successfully.');

    const server = makeStoppable(httpServer);

    function startServer() {
      const stopServer = () => {
        return new Promise((resolve) => {
          server.stop(resolve);
        });
      };

      return new Promise((resolve) => {
        server.listen(config.port || 3001, () => {
          console.log(`Server is running on ${server._connectionKey}`);
          resolve(stopServer);
        });
      });
    }

    startServer();
  })
  .catch((err) => console.log('Failed to synchronize the database.', err));
