const { Client } = require('pg');

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mani@123',
  port: 5432, // Default PostgreSQL port
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Function to generate random data for insertion
function generateRandomData(sno) {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAge = Math.floor(Math.random() * 80) + 18;
  const randomPhone = `(${Math.floor(Math.random() * 1000) + 100})-${Math.floor(Math.random() * 1000) + 100}-${Math.floor(Math.random() * 10000) + 1000}`;
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomDate = new Date(Date.now() - Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000); // Generating random date in past 100 days

  return { sno, name: randomName, age: randomAge, phone: randomPhone, location: randomLocation, created_at: randomDate };
}

// Function to insert 50 records with random data
async function insertRandomData() {
  try {
    for (let i = 1; i <= 50; i++) {
      const data = generateRandomData(i);
      const query = {
        text: 'INSERT INTO customers(sno, customer_name, age, phone, location, created_at) VALUES($1, $2, $3, $4, $5, $6)',
        values: [data.sno, data.name, data.age, data.phone, data.location, data.created_at]
      };
      await client.query(query);
    }
    console.log('Random data inserted successfully');
  } catch (error) {
    console.error('Error inserting random data:', error);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL');
  }
}

// Call function to insert random data
insertRandomData();