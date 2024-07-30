const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  console.log('Fetching products from MongoDB...');
  
  // Log the database name and collection name
  console.log('Database:', db.databaseName);
  console.log('Collection:', db.collection('final_leon_shani').collectionName);

  try {
    const products = await db.collection('final_leon_shani').find({}).toArray();
    console.log("Products fetched callback triggered."); // Ensure this line is executed
    res.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
