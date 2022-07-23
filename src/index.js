import express from "express";
import chalk from "chalk";
import cors from "cors";
import gameInfoRouter from './routes/gameInfoRouter.js';

const app = express();
app.use(cors());
app.use(express.json()); 

app.use(gameInfoRouter);

const door = process.env.PORT || 4000;

app.listen(door, () => { 
    console.log(chalk.blue.bold(`\nRodando na porta ${door}`));
})