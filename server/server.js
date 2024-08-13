const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express(); // initialize express app
app.use(cors()); // allow requests from client 
app.use(bodyParser.json()); // parse json requests


const uri = 'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024';
let db;

console.log('Starting server...');
console.log('Attempting to connect to MongoDB...');

//connect to mongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB successfully.');
    db = client.db('webdev2024');
    app.locals.db = db; // make database local throughout the app 

    // set routes to products and orders
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    //  set route for the root URL
    app.get('/', (req, res) => {
      res.send('Welcome to the Shoe Store API');
    });

    // define port and run server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

console.log('Server setup complete.');
