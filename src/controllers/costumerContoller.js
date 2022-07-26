import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
dotenv.config(); 

export async function getCustomers(req,res) { 
    const { cpf } = req.query;
    console.log(cpf);
    try {
        if(cpf) { 
            const { rows: customers } = await connection.query({
                text: `SELECT * FROM customers
                WHERE cpf 
                LIKE ($1)`, 
                values: [`${cpf}%`]});
            return res.send(customers).status(200);
        } else {
            const { rows: customers } = await connection.query('SELECT * FROM customers');
            return res.send(customers).status(200); 
        }
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
}  

export async function getCustomersById(req,res) { 
    const { id } = req.params;
    console.log(id);
    try {
        const { rows: customers } = await connection.query('SELECT * FROM customers WHERE id= $1',[id]); 
        if(customers.length === 0) { 
            return res.sendStatus(404);
        }
        return res.send(customers[0]).status(200); 
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
} 

export async function postCustomers(req,res) { 
    const { name, phone, cpf, birthday} = req.body; 
    try {
        await connection.query('INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)',[name,phone,cpf,birthday]);
        return res.send(201);
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
}

export async function updateCustomers(req,res) { 
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body; 
    
    try {
        await connection.query('UPDATE customers SET name= $1, phone= $2, cpf= $3, birthday= $4 WHERE id= $5',[name,phone,cpf,birthday,id]);
        return res.send(200);
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
}