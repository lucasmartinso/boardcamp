import connection from "../dbStrategy/postgresdb.js";
import gameSchema from "../schemas/gameSchema.js";

export async function validateGames(req,res,next) { 
    const { name, categoryId, stockTotal, pricePerDay } = req.body;
    const validation = gameSchema.validate(req.body); 
    const { rows: findExist } = await connection.query('SELECT * FROM categories WHERE id= $1',[categoryId]);

    if(validation.error || !findExist || stockTotal<=0 || pricePerDay<=0) { 
        return res.sendStatus(400);
    }

    try {
        const { rows: findRepetead }= await connection.query('SELECT * FROM games WHERE name= $1',[name]);  
        if(findRepetead.length !== 0) { 
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next();
}