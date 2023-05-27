const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : {
        type : String
    },
    description : {
        trpe : String
    },
    price : {
        type : Number
    },
    onhand : {
        type : Number
    },
    seller : {
        type : String
    }
}, {timestamps : true});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;