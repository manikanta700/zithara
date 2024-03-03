const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

// PostgreSQL connection configuration
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mani@123',
    port: 5432, 
  });
  

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Route to fetch 50 records
app.get('/records', async (req, res) => {
  try {
    const query = 'SELECT * FROM customers LIMIT 50';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
