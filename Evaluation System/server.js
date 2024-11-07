const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// Create tables if they don't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    course TEXT,
    instructor TEXT,
    rating INTEGER,
    feedback TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id)
)`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secureSession',
    resave: false,
    saveUninitialized: true,
}));

// Register a new user
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], function (err) {
        if (err) {
            res.send({ success: false, message: 'Registration failed. Email might already be in use.' });
        } else {
            res.send({ success: true, message: 'Registration successful!' });
        }
    });
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, user) => {
        if (user) {
            req.session.userId = user.id;
            res.send({ success: true });
        } else {
            res.send({ success: false, message: 'Invalid email or password.' });
        }
    });
});

// Submit evaluation
app.post('/evaluation', (req, res) => {
    const { course, instructor, rating, feedback } = req.body;

    if (!req.session.userId) {
        return res.send({ success: false, message: 'You must be logged in to submit an evaluation.' });
    }

    db.run(`INSERT INTO evaluations (user_id, course, instructor, rating, feedback) VALUES (?, ?, ?, ?, ?)`,
        [req.session.userId, course, instructor, rating, feedback], function (err) {
            if (err) {
                return res.send({ success: false, message: 'Failed to submit evaluation.' });
            }
            res.send({ success: true, message: 'Evaluation submitted successfully!' });
        });
});

// Fetch evaluations for the logged-in user
app.get('/evaluations', (req, res) => {
    if (!req.session.userId) {
        return res.send({ success: false, message: 'You must be logged in to view evaluations.' });
    }

    db.all(`SELECT * FROM evaluations WHERE user_id = ?`, [req.session.userId], (err, evaluations) => {
        if (err) {
            return res.send({ success: false, message: 'Failed to retrieve evaluations.' });
        }
        res.send({ success: true, evaluations });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
