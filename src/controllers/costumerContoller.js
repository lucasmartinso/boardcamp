import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
dotenv.config(); 

export async function getCustomers(req,res) { 
    const { cpf } = req.query;
    console.log(cpf);
    try {
        if(cpf) { 
            console.log("CPF passado na rota");
            const { rows: customers } = await connection.query('SELECT * FROM customers WHERE cpf LIKE "$1%"', [cpf]);
            return res.send(customers).status(200);
        } else {
            console.log("CPF não passado na rota");
            const { rows: customers } = await connection.query('SELECT * FROM customers');
            return res.send(customers).status(200); 
        }
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
}  

export async function getCustomersById(req,res) { 
    const { id } = req.query;
    console.log(id);
    try {
        if(id) { 
            console.log("id passado na rota");
            const { rows: customers } = await connection.query('SELECT * FROM customers WHERE id LIKE "$1"', [id]);
            return res.send(customers).status(200);
        } else {
            console.log("id não passado na rota");
            const { rows: customers } = await connection.query('SELECT * FROM customers');
            return res.send(customers).status(200); 
        }
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
    
}