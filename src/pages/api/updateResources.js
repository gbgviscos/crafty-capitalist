export default (req, res) => {
    if (req.method === 'POST') {
      // In a real API, here you'd update your database with the received data
      // For the mock, just return the data as if it was saved successfully
      res.status(200).json(req.body);
    } else {
      res.status(405).end();  // Method not allowed
    }
  }