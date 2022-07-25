import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
dotenv.config(); 

export async function getRentals(req,res) { 
    try {
        const { rows: rentals } = await connection.query('SELECT r.*,c.id,c.name,g.id,g.name,g."categoryId",g."categoryName" FROM rentals r JOIN customers JOIN ')
    } catch (error) {
        
    }
};

export async function postRentals(req,res) { 
    const { customerId, gameId, daysRented } = req.body;
    const returnDate= null;
    const delayFee= null;

    let now = dayjs().locale("pt-br");
    let rentDate = now.format("YYYY-MM-DD");

    const { rows: games } = await connection.query('SELECT * FROM games'); 
    const priceDay = games.find(game => game.id === gameId); 

    const originalPrice = (priceDay.pricePerDay) * daysRented;

    if(priceDay.stockTotal===0) { 
        return res.sendStatus(400);
    }

    try {
        await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',[customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee]);
        await connection.query('UPDATE games SET "stockTotal"= $1',[priceDay.stockTotal-1]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    } 
}; 

export async function postRentalsById(req,res) { 

}; 

export async function deleteRentals(req,res) { 

};