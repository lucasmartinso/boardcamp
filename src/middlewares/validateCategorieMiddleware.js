import connection from "../dbStrategy/postgresdb.js";
import categorieSchema from "../schemas/categorieSchema.js";

export async function validateCategorie(req,res,next) { 
    const validation = categorieSchema.validate(req.body);

    if(validation.error) { 
        return res.sendStatus(400);
    }

    try {
        const { rows: findRepetead }= await connection.query('SELECT * FROM categories WHERE name= $1',[req.body.name]); 
        console.log(findRepetead.length);
        if(findRepetead.length !== 0) { 
            return res.sendStatus(409);
        }
    } catch (error) {
        return res.sendStatus(500);
    }
    next();
}