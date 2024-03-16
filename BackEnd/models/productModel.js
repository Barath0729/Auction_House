const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter the product name"],
        trim:true,
        maxLength:[100,"Product name cannot exceed 100 character"]
    },
    price:{
        type:Number,
        required:true,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"],
        enum: {
            values:[
                'Electronics',
                'Vechicles',
                'Books',
                'miscellenous',
                'jewellary'
            ],
            message:"please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter product seller name"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
    },
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createAt:{
        type: Date,
        default: Date.now()
    }
})

let schema= mongoose.model('product',productSchema)
module.exports = schema