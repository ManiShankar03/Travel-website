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

require('dotenv').config();
app.use(express.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rcb2345*',
  database: 'fullstack'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});
app.use(session({
  secret: '123', // Replace with a secret key of your choosing
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' } 
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Handle requests to the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.post('/login', (req, res) => {
  const email = req.body.email;
 
  const password = req.body.password;
  
  const enteredCaptcha = req.body.textinput;

  const storedCaptcha = req.body.hiddencapt;


  if (storedCaptcha != enteredCaptcha) {
    console.log('Invalid captcha');
    res.redirect('/?error=' + encodeURIComponent('Invalid captcha'));
    return;
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], (err, results) => {
    if (err) {
      res.json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      // Compare hashed password
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          res.json({ success: false, message: 'Internal server error' });
          return;
        }

        if (isMatch) {
          // Password matches, set session username
          req.session.username = results[0].username;
          req.session.email=results[0].email;
        
          console.log(req.session.username); // assuming username is a field in your database
          res.sendFile(path.join(__dirname, 'public', 'login.html'));
        } else {
          // Password does not match
          res.redirect('/?error=' + encodeURIComponent('Invalid email or password'));
        }
      });
    } else {
      // Email not found
      res.redirect('/?error=' + encodeURIComponent('Invalid email or password'));
    }
  });
});
const otpStore = {};

async function sendEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mani2shankar1@gmail.com',
            pass: 'iarm cyfa eqdx pqri'
        }
    });

    const mailOptions = {
        from: 'mani2shankar1@gmail.com',
        to: email,
        subject: 'Email validation',
        text: 'Your OTP is: ' + otp
    };

    await transporter.sendMail(mailOptions);
}

app.post('/send-otp', async (req, res) => {
    const userEmail = req.body.email;
    console.log("Request body:", req.body.email);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await sendEmail(userEmail, otp);
        otpStore[userEmail] = otp; // Store OTP
        setTimeout(() => delete otpStore[userEmail], 300000); // OTP expires in 5 minutes
        res.send('OTP sent to ' + userEmail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.post('/validate-otp', async (req, res) => {
    const { username, email, password, otp } = req.body;
    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email];

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            db.query(sql, [username, email, hashedPassword], (err, result) => {
                if (err) throw err;
                req.session.username = username;
                
                res.json({ success: true, message: 'Operation successful' }); 
                console.log('Data inserted ');
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error during registration');
        }
    } else {
       res.json({ success: false, message: 'Invalid otp' });
    }
});
app.get('/login', (req, res) => {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  } else {
    // Handle the case where the user is not logged in
    res.redirect('/');
  }
});

app.get('/get-username', (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username });
  } else {
    res.json({ username: null });
  }
});
app.get('/get-email',(req,res)=>{
if(req.session.email){
res.json({email:req.session.email});}
else{
res.json({email:null});}
});
app.get('/api/countries', (req, res) => {
  db.query('SELECT * FROM countries', (error, results) => {
    if (error) {
      return res.status(500).send('Error fetching countries');
    }
    res.json(results);
    console.log('Country database accessed');
  });
});
app.get('/api/destinations/:departure', (req, res) => {
  const departurePoint = req.params.departure;
  db.query('SELECT * FROM destination WHERE Departure_country_name = ?', [departurePoint], (error, results) => {
    if (error) {
      return res.status(500).send('Error fetching destinations');
    }
    res.json(results);
  });
});

app.get('/api/hotels/:departure/:arrival', (req, res) => {
  const { departure, arrival } = req.params;
  db.query('SELECT destination_id FROM destination WHERE Departure_country_name = ? AND Arrival_country_name = ?', [departure, arrival], (error, results) => {
    if (error || results.length === 0) {
      return res.status(500).send('Error fetching destination ID');
    }
    const destinationId = results[0].destination_id;
    console.log('Destination_id found');
    db.query('SELECT DISTINCT type FROM hotel WHERE destination_id = ?', [destinationId], (error, hotelResults) => {
      if (error) {
        return res.status(500).send('Error fetching hotel types');
      }
      res.json(hotelResults.map(h => h.type));
    });
  });
});
app.get('/api/flights/:departure/:arrival', (req, res) => {
console.log('Departure:', req.params.departure, 'Arrival:', req.params.arrival);
  const { departure, arrival } = req.params;
  db.query('SELECT destination_id FROM destination WHERE Departure_country_name = ? AND Arrival_country_name = ?', [departure, arrival], (error, results) => {
    if (error || results.length === 0) {
      return res.status(500).send('Error fetching destination ID');
    }
    const destinationId = results[0].destination_id;
    db.query('SELECT DISTINCT type FROM flight WHERE destination_id = ?', [destinationId], (error, flightResults) => {
      if (error) {
        return res.status(500).send('Error fetching flight types');
      }
      res.json(flightResults.map(f => f.type));
    });
  });
});
app.get('/api/getDestinationId/:departure/:arrival', (req, res) => {
    const { departure, arrival } = req.params;
    const query = 'SELECT destination_id FROM destination WHERE Departure_country_name = ? AND Arrival_country_name = ?';
    db.query(query, [departure, arrival], (error, results) => {
        if (error) return res.status(500).send('Error fetching destination ID');
        if (results.length > 0) {
            res.json({ destination_id: results[0].destination_id });
        } else {
            res.status(404).send('No matching destination found');
        }
    });
});
app.get('/api/hotelPrice/:hotelType/:destinationId', (req, res) => {
    const { hotelType, destinationId } = req.params;
    const query = 'SELECT base_price FROM hotel WHERE type = ? AND destination_id = ?';
    db.query(query, [hotelType, destinationId], (error, results) => {
        if (error) return res.status(500).send('Error fetching hotel price');
        if (results.length > 0) {
            res.json({ price: results[0].base_price });
        } else {
            res.status(404).send('Hotel type or destination not found');
        }
    });
});
app.get('/api/flightPrice/:flightType/:destinationId', (req, res) => {
    const { flightType, destinationId } = req.params;
    const query = 'SELECT base_price FROM flight WHERE type = ? AND destination_id = ?';
    db.query(query, [flightType, destinationId], (error, results) => {
        if (error) return res.status(500).send('Error fetching flight price');
        if (results.length > 0) {
            res.json({ price: results[0].base_price });
        } else {
            res.status(404).send('Flight type or destination not found');
        }
    });
});
app.get('/api/activityPrice/:destinationId', (req, res) => {
    const { flightType, destinationId } = req.params;
    const query = 'SELECT base_price FROM activities WHERE  destination_id = ?';
    db.query(query, [ destinationId], (error, results) => {
        if (error) return res.status(500).send('Error fetching activity price');
        if (results.length > 0) {
        console.log('Activity price found');
            res.json({ price: results[0].base_price });
        } else {
        console.log('Activity price not found');
            res.status(404).send('Activities cost not found');
        }
    });
});
app.get('/api/otherexpensePrice/:destinationId', (req, res) => {
    const { flightType, destinationId } = req.params;
    const query = 'SELECT base_price FROM extraexpense WHERE  destination_id = ?';
    db.query(query, [ destinationId], (error, results) => {
        if (error) return res.status(500).send('Error fetching activity price');
        if (results.length > 0) {
     
            res.json({ price: results[0].base_price });
        } else {
    
            res.status(404).send('Activities cost not found');
        }
    });
});
app.get('/bill', (req, res) => {
    // If you're using a templating engine like EJS, Pug, etc.
    // res.render('payment', { price: req.query.price });

    // If you're serving static HTML files
    res.sendFile(path.join(__dirname, 'public/bill.html'));
    // Make sure to replace 'path_to_your_payment.html' with the actual path to your payment HTML file
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/invoice', (req, res) => {
    // If you're using a templating engine like EJS, Pug, etc.
    // res.render('payment', { price: req.query.price });

    // If you're serving static HTML files
    res.sendFile(path.join(__dirname, 'public/invoice.html'));
    // Make sure to replace 'path_to_your_payment.html' with the actual path to your payment HTML file
});
app.post('/create-booking', (req, res) => {
const currentDate = new Date()
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(100 + Math.random() * 900).toString();
    const bookingId = `${year}${month}${day}${randomNum}`;
const email = req.session.email;

   const {
      totalPrice, 
     
      departurePoint, 
      arrivalPoint, 
      dateOfJourney
   } = req.body;

// Get the current date in YYYY-MM-DD format


// SQL query to insert data into the booking table
const insertQuery = `INSERT INTO booking (bookingid, email, booked_time, departure_point, arrival_point, date_of_journey, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)`;

db.query(insertQuery, [bookingId, email, currentDate, departurePoint, arrivalPoint, dateOfJourney, totalPrice], (err, result) => {
    if (err) {
        console.error("Error inserting data into booking table:", err);
        res.status(500).send("Error processing booking");
    } else {
        console.log("Booking successfully created with ID:", bookingId);
        res.send({ success: true, bookingId: bookingId });
    }
});
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.get('/user-dashboard', (req, res) => {
    const userEmail = req.session.email;
    console.log(userEmail);
    const query = 'SELECT bookingid, booked_time, departure_point, arrival_point, date_of_journey, total_price FROM booking WHERE email = ?';
    db.query(query, [userEmail], (err, results) => {
if (err) {
console.error(err);
return res.status(500).send("Error retrieving data");
}
res.json(results);
});
});
app.get('/check-login', (req, res) => {
  if (req.session.username) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

