// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Create an Express application
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5173',  //frontend URL during development
    optionsSuccessStatus: 200, 
  };
  
app.use(cors(corsOptions));
  

// Create a MySQL database connection pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "your_new_password",
    database: "book_hub",
    insecureAuth: true
});

// Define CRUD operations for books

// Read all books, with optional genre filtering
app.get('/api/books', (req, res) => {
    const genre = req.query.genre;
    let sql = 'SELECT * FROM books';
    if (genre) {
        sql += ' WHERE genre = ?';
    }
    db.query(sql, genre, (err, results) => {
        if (err) {
            console.error('Error fetching books', err);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        } else {
            res.json(results);
        }
    });
});

// Fetch a book by ID
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM books WHERE id = ?';
    
    db.query(sql, id, (err, results) => {
        if (err) {
            console.error(`Error fetching book with ID ${id}`, err);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        } else {
            if (results.length > 0) {
                res.json(results[0]); // Assuming ID is unique, return the first result
            } else {
                res.status(404).json({ error: `Book with ID ${id} not found` });
            }
        }
    });
});

// Create a new book (including ratings)
app.post('/api/books', (req, res) => {
    const { title, author, genre, publication_date, rating } = req.body;
    const sql = 'INSERT INTO books (title, author, genre, publication_date, rating) VALUES (?, ?, ?, ?, ?)';
    const values = [title, author, genre, publication_date, rating];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating book', err);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        } else {
            res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
        }
    });
});

// Update a book by ID (including ratings)
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publication_date, rating } = req.body;
    const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, publication_date = ?, rating = ? WHERE id = ?';
    const values = [title, author, genre, publication_date, rating, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating book', err);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: `Book with ID ${id} updated successfully` });
            } else {
                res.status(404).json({ error: `Book with ID ${id} not found` });
            }
        }
    });
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;

    // Validate 'id' is a number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    const sql = 'DELETE FROM books WHERE id = ?';

    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting book', err);
            res.status(500).json({ error: 'Internal server error', details: err.message });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: `Book with ID ${id} deleted successfully` });
            } else {
                res.status(404).json({ error: `Book with ID ${id} not found` });
            }
        }
    });
});

// Run the API on port 7080
app.listen(7080, () => {
  console.log("Our API is running on port 7080");
});
