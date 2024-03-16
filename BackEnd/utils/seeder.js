const products = require('../data/products.json');

const product = require('../models/productModel');

const connectDataBase = require('../config/database');
const dotenv = require('dotenv');

dotenv.config({path:'backend/config/config.env'});


connectDataBase();
const seedproducts = async ()=>{
    try{
    await product.deleteMany();
    console.log("products deleted!");
    await product.insertMany(products);
    console.log("all products added!");
    }catch(err){
        console.log(error.message);
    }
    process.exit();
}

seedproducts();