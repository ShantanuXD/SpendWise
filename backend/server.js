const express = require("express")
const cors = require("cors")
const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/add", (req, res) => {
  const { amount, type, category, note, date } = req.body

  db.run(
    `INSERT INTO transactions (amount,type,category,note,date)
     VALUES (?,?,?,?,?)`,
    [amount, type, category, note, date],
    function (err) {
      if (err) return res.status(500).send(err)
      res.send({ success: true })
    }
  )
})

app.get("/transactions", (req, res) => {
  db.all("SELECT * FROM transactions", (err, rows) => {
    res.json(rows)
  })
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})