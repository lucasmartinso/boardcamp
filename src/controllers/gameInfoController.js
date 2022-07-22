import connection from '../dbStrategy/postgresdb.js';

export async function getCategories(req,res) {
    try {
        const { rows: categories } = await connection.query('SELECT * FROM categories');
        console.log(categories); 
        if(!categories) { 
            return res.sendStatus(404);
        } else { 
            return res.send(categories).status(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}  

export async function postCategories(req,res) { 
    const { name } = req.body; 
    console.log(name); 
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1)',[name]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
} 

export async function getGames(req,res) { 
    try {
        const {rows: games} = await connection.query('SELECT * FROM games');
        return res.send(games).status(200);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function postGames(req,res) { 
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connection.query('INSERT INTO games (name,image,stockTotal,categoryId,pricePerDay) VALUES ($1,$2,$3,$4,$5)',[name,image,stockTotal,categoryId,pricePerDay]);
        return res.sendStatus(2001);
    } catch (error) {
        return res.sendStatus(500);
    }
}