import express from "express";
import chalk from "chalk";
import cors from "cors";
import gameInfoRouter from './routes/gameInfoRouter.js'; 
import customersRouter from './routes/customersRouter.js'

const app = express();
app.use(cors());
app.use(express.json()); 

app.use(gameInfoRouter,customersRouter);

app.listen(process.env.PORT, () => { 
    console.log(chalk.blue.bold(`\nRodando na porta ${process.env.PORT}`));
})