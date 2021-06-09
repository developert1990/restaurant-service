require('dotenv').config();
import express from 'express';
import cors from 'cors';
import router from './router';
import { initialAWS } from './config/awsConfig';

const { PORT } = initialAWS();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    if (!err) {
        return res.status(404).send('NOT FOUND');
    }
    res.status(500).send('INTERNAL SERVER ERROR');
});

export const server = app.listen(PORT || 7707);
