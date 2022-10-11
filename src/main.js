const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const Port = 8080;

const fastFoodList = "fastfood.json"

class Products{
    constructor(fastFoodList){
        this.fastFoodList = fastFoodList
    }

    async validateExistList() {
        try{
            await fs.promises.stat(this.fastFoodList);
            return 1;
        }catch (err){
            console.log("Creating list");
            await fs.promises.writeFile(this.fastFoodList, JSON.stringify([]));
            return 0;
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.fastFoodList, 'utf-8');
            return JSON.parse(data);
        }catch(err){
            console.log("Could not get fast food list", err)
        }
    }

    async productRandom(){

    }
}

const fastFood1 = new Products(fastFoodList)

app.get('/products', async (req, res) => {
    const products = await fastFood1.getAll()
    res.json(products)
})

app.get('/listRandom', async (req, res) => {
    try {
        const product = await fastFood1.getAll();
    
        if (product.length === 0) {
            res.json({
            res: "error 404",
        });
        } else {
            res.json({
            res: product[Math.floor(Math.random() * product.length)],
            });
        }
    } catch (error) {
        console.log("error 500", error);
    }
})

const server = app.listen(Port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`))