const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  
const db = require('./database');  

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.get('/cars', (req, res) => {
    db.all("SELECT id, brand, model, price FROM cars", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ cars: rows });
    });
});

app.post('/cars', (req, res) => {
    const { brand, model, price } = req.body;

    if (!brand || !model || !price) {
        return res.status(400).json({ error: 'Brand, model, and price are required' });
    }

    const stmt = db.prepare("INSERT INTO cars (brand, model, price) VALUES (?, ?, ?)");
    stmt.run(brand, model, price, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            brand,
            model,
            price
        });
    });
    stmt.finalize();
});

app.get('/clear-cars', (req, res) => {
    db.run("DELETE FROM cars", (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'All cars have been cleared from the database.' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
