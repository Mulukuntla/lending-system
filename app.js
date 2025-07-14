const express = require('express');
const mongoose = require('mongoose');
const path=require("path")
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const authMiddleware = require('./middleware/auth');
const isAdminMiddleware = require('./middleware/isAdmin');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/borrow', borrowRoutes);


// Example of using middleware for protected routes

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://Saketh:Saketh1234@cluster0.kdqhj.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error);
  });