const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Direct PostgreSQL connection successful!');
    
    const res = await client.query('SELECT * FROM "User" LIMIT 1');
    console.log(`Found ${res.rows.length} users`);
  } catch (error) {
    console.error('❌ Direct PostgreSQL connection failed:', error);
  } finally {
    await client.end();
  }
}

testConnection();