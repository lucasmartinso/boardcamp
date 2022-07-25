import connection from '../dbStrategy/postgresdb.js';
import dotenv from "dotenv"; 
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
dotenv.config(); 

export async function getRentals(req,res) { 
    const { customerId, gameId } = req.query;
    try {
        if(!customerId && !gameId) {
            const { rows: rentals } = await connection.query(`SELECT json_build_object(
                'id', r.id,
                'customerId', r."customerId",
                'gameId', r."gameId",
                'rentDate', r."rentDate",
                'daysRented', r."daysRented", 
                'returnDate', r."returnDate", 
                'originalPrice', r."originalPrice", 
                'delayFee', r."delayFee",
                'customer' , json_build_object(
                    'id', c.id,
                    'name', c.name
                    ), 
                'game' , json_build_object(
                    'id', g.id, 
                    'name', g.name, 
                    'categoryId', g."categoryId", 
                    'categoryName' , cat.name
                    )
                )
                FROM rentals r 
                INNER JOIN customers c ON r."customerId" = c.id 
                INNER JOIN games g ON r."gameId" = g.id 
                INNER JOIN categories cat ON g."categoryId" = cat.id`); 
            return res.send(rentals.map(rent => rent.json_build_object)).status(200);
        } else if(customerId && !gameId) { 
            console.log("entrou");
            const { rows: rentalsCustomer } = await connection.query(`SELECT json_build_object(
                'id', r.id,
                'customerId', r."customerId",
                'gameId', r."gameId",
                'rentDate', r."rentDate",
                'daysRented', r."daysRented", 
                'returnDate', r."returnDate", 
                'originalPrice', r."originalPrice", 
                'delayFee', r."delayFee",
                'customer' , json_build_object(
                    'id', c.id,
                    'name', c.name
                    ), 
                'game' , json_build_object(
                    'id', g.id, 
                    'name', g.name, 
                    'categoryId', g."categoryId", 
                    'categoryName' , cat.name
                    )
                )
                FROM rentals r 
                INNER JOIN customers c ON r."customerId" = c.id 
                INNER JOIN games g ON r."gameId" = g.id 
                INNER JOIN categories cat ON g."categoryId" = cat.id
                WHERE r."customerId" = $1`,[customerId]); 
            return res.send(rentalsCustomer.map(rent => rent.json_build_object)).status(200);
        } else if(!customerId && gameId) { 
            console.log("ta lá");
            const { rows: rentalsGame } = await connection.query(`SELECT json_build_object(
                'id', r.id,
                'customerId', r."customerId",
                'gameId', r."gameId",
                'rentDate', r."rentDate",
                'daysRented', r."daysRented", 
                'returnDate', r."returnDate", 
                'originalPrice', r."originalPrice", 
                'delayFee', r."delayFee",
                'customer' , json_build_object(
                    'id', c.id,
                    'name', c.name
                    ), 
                'game' , json_build_object(
                    'id', g.id, 
                    'name', g.name, 
                    'categoryId', g."categoryId", 
                    'categoryName' , cat.name
                    )
                )
                FROM rentals r 
                INNER JOIN customers c ON r."customerId" = c.id 
                INNER JOIN games g ON r."gameId" = g.id 
                INNER JOIN categories cat ON g."categoryId" = cat.id
                WHERE r."gameId" = $1`,[gameId]); 
            return res.send(rentalsGame.map(rent => rent.json_build_object)).status(200);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
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
    const { id } = req.params;
    const { rows: findRent } = await connection.query('SELECT * FROM rentals WHERE id= $1',[id]);

    let now = dayjs().locale("pt-br");
    let returnDate = now.format("YYYY-MM-DD");

    if(findRent.length === 0) { 
        return res.sendStatus(404);
    } else if(findRent[0].returnDate) { 
        return res.sendStatus(400);
    } 

    const { rows: games } = await connection.query('SELECT * FROM games'); 
    const priceDay = games.find(game => game.id === findRent[0].gameId); 

    let delayFee = (parseInt((Date.parse(returnDate) - Date.parse(findRent[0].rentDate))/86400000) - findRent[0].daysRented) * ((findRent[0].originalPrice)/findRent[0].daysRented);
    if(delayFee<0) { 
        delayFee=0;
    }

    try {
        await connection.query('UPDATE rentals SET "returnDate"= $1, "delayFee"= $2 WHERE id= $3', [returnDate,delayFee,id]);
        await connection.query('UPDATE games SET "stockTotal"= $1',[priceDay.stockTotal+1]);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}; 

export async function deleteRentals(req,res) { 
    const { id } = req.params; 

    const { rows: findRental } = await connection.query('SELECT * FROM rentals WHERE id= $1',[id]);
    if(findRental.length === 0) { 
        return res.sendStatus(404);
    } else if(findRental[0].returnDate === null) { 
        return res.sendStatus(400);
    } 

    try {
        const { rows: devolvidos } = await connection.query('SELECT * FROM games');
        await connection.query('DELETE FROM rentals WHERE id= $1', [id]); 
        console.log(devolvidos);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};