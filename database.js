const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("error opening database ", err.message);
    } else {
        console.log("connected to sqlite database");
    }
})

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS cars (id INTERGER PRIMARY KEY, brand TEXT, model TEXT, price TEXT)")

    const stmt = db.prepare("INSERT INTO cars (brand, model, price) VALUES (?, ?, ?)");
    stmt.run('Volvo', 'V70', "70000");
    stmt.run('Volvo', 'V40', "45000");
    stmt.finalize();
})

db.all("SELECT id, brand, model, price FROM users", [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(`${row.id}: ${row.brand}, Price: ${row.price}`);
    });
  });
  
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database closed.');
    }
  });