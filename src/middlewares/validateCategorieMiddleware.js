import connection from "../dbStrategy/postgresdb.js";
import categorieSchema from "../schemas/categorieSchema.js";

export async function validateCategorie(req,res,next) { 
    const validation = categorieSchema.validate(req.body);

    if(validation.error) { 
        return res.sendStatus(400);
    }

    try {
        const findRepetead = await connection.query('SELECT * FROM categories WHERE name= $1',[req.body.name]);
        if(findRepetead) { 
            return res.sendStatus(409);
        }
    } catch (error) {
        return res.sendStatus(500);
    }
    next();
}