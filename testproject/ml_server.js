const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const port = 3000;
const path = require('path');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const moment = require('moment');
app.use(cors());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rcb2345*',
  database: 'mlproject'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Handle requests to the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ml_index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
