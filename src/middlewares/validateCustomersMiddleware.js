import connection from "../dbStrategy/postgresdb.js";
import customersSchema from "../schemas/customersSchema.js";

export async function validateCustomers(req,res,next) { 
    const { cpf } = req.body;
    const validation = customersSchema.validate(req.body); 

    if(validation.error) { 
        return res.sendStatus(400);
    }
    
    try {
        const { rows: findRepetead }= await connection.query('SELECT * FROM customers WHERE cpf= $1',[cpf]);  
        if(findRepetead.length !== 0) { 
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next();
}