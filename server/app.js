const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./product.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_client', {useNewUrlParser: true});

var myLogger = function(req, res, next) {
    console.log(req.body);
    next();
}
app.use(myLogger);

app.get('/products', function(req, res) {
    Product.find().lean().exec(
        (err, prods) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(prods);
            }
        }
    );
});

app.get('/productserr', function(req, res) {    
    setTimeout(() => {
        res.status(500).send('Error message from the server');
    }, 2000);
});

app.get('/productsdelay', function(req, res) {

    setTimeout(() => {
        
        Product.find().lean().exec(
            (err, prods) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(200).send(prods);
                }
            }
        );

    }, 2000);

});

app.get('/products_ids', function(req, res) {
    Product.find().lean().exec(
        (err, prods) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(prods.map(p => p._id));
            }
        }
    );
});

app.get('/products/names/:id', function(req, res) {
    const id = req.params.id;
    Product.findById(id, 
        (err, prods) => {
            if (err) {
                res.status(500).send(err);
            }
            else if (!prods) {
                res.status(404).send();
            }
            else {
                res.status(200).send(prods.name);
            }
        }
    );
});

app.post('/products', function(req, res) {

    p = new Product({
        name: req.body.name,
        department: req.body.department,
        price: req.body.price
    });

    p.save((err, prod) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(prod);
        }
    });
});

app.delete('/products/:id', function(req, res) {
    Product.deleteOne({_id: req.params.id},
        (err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send({});
            }
        });
});

app.patch('/products/:id', function(req, res) {

    const id = req.params.id;
    Product.findById(id, 
        (err, prods) => {
            if (err) {
                res.status(500).send(err);
            }
            else if (!prods) {
                res.status(404).send({});
            }
            else {
                prods.name = req.body.name;
                prods.department = req.body.department;
                prods.price = req.body.price;

                prods.save((err, prods) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(200).send(prods);
                    }
                });
            }
        }
    );

});

app.listen(9001);