const books= require('../models/Book');

module.exports.addBook = async (req, res) => {
  console.log("hi")
  const { title, author} = req.body;
  
  try {
    const book = new books({ title, author});
    await book.save();
    
    res.status(201).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getbooks = async (req, res) => {
  try {
    console.log("hi")
    const book=await books.find()
    
    res.status(201).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.notaddBook = async (req, res) => {
  console.log("hi")
  console.log(req.body)
  console.log(req.params)
  const {bookId} = req.params;
  
  
  try {
    const book = await books.findById(bookId);
        
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }
    await books.findByIdAndDelete(bookId)
    res.status(201).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};
