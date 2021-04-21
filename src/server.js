require('dotenv').config();
import express from 'express';
import cors from 'cors';
import router from './router';

const PORT = 7707;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

export const server = app.listen(PORT || 7707, () => {
    console.log(`Server is running on ${PORT}`);
});
