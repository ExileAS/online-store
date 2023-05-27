const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const dbURI = 'mongodb+srv://Ahmed-Samy:Shadow444555@my-online-store.k9hj2du.mongodb.net/';
mongoose.connect(dbURI)
    .then(result => {
        app.listen(3007);
        console.log('listening on port 3007')
    })
    .catch(err => console.log(err));

    

app.get('/api', (req, res) => {
    const product = new Product({
        name : '1',
        description : '2',
        price : 5,
        onhand : 1,
        seller : '22'
    });
    
    product.save();
    res.send('hello from express')
})

