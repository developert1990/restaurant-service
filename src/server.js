require('dotenv').config();
import express from 'express';
import cors from 'cors';
const PORT = 7707;
const app = express();
app.use(cors());
app.use(express.json());

export const server = app.listen(PORT || 7707, () => {
    console.log(`Server is running on ${PORT}`);
});
