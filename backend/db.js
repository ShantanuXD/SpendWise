const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Correct path to database
const dbPath = path.join(__dirname, "..", "database", "expenses.db");

console.log("Database path:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL,
      type TEXT,
      category TEXT,
      note TEXT,
      date TEXT
    )
  `);
});

module.exports = db;