require('dotenv').config();
import express from 'express';
import cors from 'cors';
import router from './router';
import { initialAWS } from './config/awsConfig';
import NodeCache from 'node-cache';
import http from 'http';
import { debug as createDebug } from 'debug';
const debug = createDebug('api');

export const myCache = new NodeCache({ stdTTL: 20 });

const corsOption = {
    origin: true,
    credentials: true,
    preFlightContinue: true,
};
const { PORT } = initialAWS();
const app = express();
app.use(cors(corsOption));
app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    if (!err) {
        return res.status(404).send('NOT FOUND');
    }
    res.status(500).send(err.message);
});

export const server = app.listen(PORT || 7707, () => {
    debug(`Listening on ${PORT}`);
});
