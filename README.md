# <p align = "center">🎲 BoardCamp 🎲</p>

<p align="center">
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZi_FH7V4ujjUHfgASwgChH_6FoltFJGq0-g&s" width="500" height="400" object-fit="cover"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-lucasmartinso-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/lucasmartinso/projeto13-mywallet-back?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

This is a backend application to control the data flow of basically a board game rental company, in which the option to advertise the games through the platform and so users can rent them to have fun on their weekends, with friends, family, etc...
***

## :computer:	 Tecnolgy and Concepts 

- Node.js
- JavaScript
- PostgresSQL

***

## :rocket: Routes

### 👥 Customers 
    
```yml 
GET /customers
    - Route to get all customers
    - headers: {}
    - body: {}
```

```yml 
GET /customers/:id
    - Route to get a complete info about a customer
    - headers: {}
    - params: id(number)
    - body: {}
```

```yml
POST /customers
    - Route to create customer acount
    - headers: {}
    - body:{
        "name": "lorem",
        "phone": "1234567890",
        "cpf": "01234567890",
        "birthday": date
}
```

```yml
PUT /customers/:id
    - Route to update customer acount
    - headers: {}
    - params: id(number)
    - body:{
        "name": "lorem",
        "phone": "1234567890",
        "cpf": "01234567890",
        "birthday": date
}
```

### 🎮​ Games  

```yml 
GET /categories
    - Route to get all game's categories 
    - headers: {}
    - body: {}
```

```yml 
GET /games
    - Route to get all games 
    - headers: {}
    - body: {}
```

```yml 
POST /categories
    - Route to add a game categorie 
    - headers: {}
    - body: {
        "name": "lorem ipsum"
    }
```

```yml 
POST /games
    - Route to add a game 
    - headers: {}
    - body: {
        "name": "lorem ipsum",
        "image": "https://lorem.com",
        "stockTotal": number >= 0,
        "categoryId": id,
        "pricePerDay": number >= 0
    }
```

### 🤝​ Rent

```yml 
GET /rentals
    - Route to get all game's rented
    - headers: {}
    - body: {}
```

```yml 
POST /rentals
    - Route to post a game rented 
    - headers: {}
    - body: {
        "customerId": number,
        "gameId": number,
        "daysRented": number
    }
```

```yml 
POST /rentals/:id/return
    - Route to post devolution of rented game 
    - headers: {}
    - params: id(number)
    - body: {}
```

```yml 
DELETE /rentals/:id
    - Route to delete rented game from the historic 
    - headers: {}
    - params: id(number)
    - body: {}
```

## 🏁 Running the application locally

First, make the clone repository in your machine:

```
git clone https://github.com/lucasmartinso/boardcamp.git
```

After, inside the folder, run the comand to install the dependencies.

```
npm install
```
Config the .env, .env.test and .env.development based on .env.example

To run the tests 
```
npm run test
```

To finish the process, to init the server
```
npm start or npm run dev
```
