const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

module.exports.borrowBook = async (req, res) => {
  const { userId, bookId} = req.body;
  
  try {
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    const borrow = new Borrow({ userId, bookId});
    await borrow.save();
    console.log(req.user.username)
    if(book.borrowed!=="no"){
      return res.status(400).json({message:"this book is already borrowed"})
    }
    book.borrowed=req.user.username
    book.save()
    
    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports.returnBook = async (req, res) => {
  const {bookId} = req.body;
  
  try {
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if(book.borrowed=="no"){
      return res.status(400).json({message:"this book is already returned"})
    }
    book.borrowed="no"
    await book.save()
    
    res.status(201).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};