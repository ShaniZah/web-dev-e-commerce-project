const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const db = req.app.locals.db;
  const order = req.body;

  try {
    const result = await db.collection('orders_leon_shani').insertOne(order);
    
    res.json({ _id: result.insertedId });
    console.log(`Order placed successfully. Order ID: ${result.insertedId}`);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
    console.error('Error placing order:', error);
  }
});

module.exports = router;
