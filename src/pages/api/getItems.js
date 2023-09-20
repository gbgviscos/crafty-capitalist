import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'test',
      database: 'localtesting',
      connectionLimit: 10,
    });

    if (req.method === 'GET') {
      // Handle GET request to fetch items
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT json_column FROM items');
      connection.release();
    
      // Extract only the JSON values from the rows
      const extractedData = rows.map(row => row.json_column);
    
      // Merge all the individual objects into one
      const mergedData = extractedData.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
    
      res.status(200).json(mergedData);
    } else if (req.method === 'POST') {
      // Handle POST request to add a new item

      // Get the JSON object from the request body
      const newItem = req.body;

      if (!newItem) {
        return res.status(400).json({ error: 'Invalid JSON data' });
      }

      const connection = await pool.getConnection();
      await connection.query('INSERT INTO items (json_column) VALUES (?)', [JSON.stringify(newItem)]);
      connection.release();

      res.status(201).json({ message: 'Item added successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
