import connection from "../dbStrategy/postgresdb.js";
import rentalsSchema from "../schemas/rentalsSchema.js";

export async function validateRentals(req,res,next) { 
    const { customerId, gameId, daysRented } = req.body;
    const validation = rentalsSchema.validate(req.body); 

    try {
        const { rows: findCustomer } = await connection.query('SELECT * FROM customers WHERE id= $1',[customerId]);
        const { rows: findGame } = await connection.query('SELECT * FROM games WHERE id= $1',[gameId]);
        if(validation.error || daysRented<=0 || findCustomer.length===0 || findGame.length===0) { 
            return res.sendStatus(400); 
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    next();
}