require('dotenv').config();
import express from 'express';
import cors from 'cors';
import router from './router';
import { initialDynamo } from './config/awsConfig';

const { PORT } = initialDynamo();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

export const server = app.listen(PORT || 7707);
