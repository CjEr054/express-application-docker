const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/cars', (req, res) => {
    db.all("SELECT id, brand, model, price FROM users", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ users: rows });
    });
  });
  
  app.post('/cars', (req, res) => {
    const { name, age } = req.body;
    
    if (!name || !age) {
      return res.status(400).json({ error: 'Brand model and price are required' });
    }
  
    const stmt = db.prepare("INSERT INTO cars (brand, model, price) VALUES (?, ?, ?)");
    stmt.run(name, age, function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, age });
    });
    stmt.finalize();
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });