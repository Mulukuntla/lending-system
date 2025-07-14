

const apiUrl = 'http://localhost:4000'; // Replace with your API URL
let token =localStorage.getItem("token");
let isAdmin = false;

const loginBtn = document.getElementById('login-btn');
const borrowBtn = document.getElementById('borrow-btn');
const returnBtn = document.getElementById('return-btn');
const addBookBtn = document.getElementById('add-book-btn');
const removeBookBtn = document.getElementById('remove-book-btn');
const booksList = document.getElementById('book-list');
const loginForm = document.getElementById('login-form');
const bookListSection = document.getElementById('books-list');
const borrowBookForm = document.getElementById('borrow-book-form');
const returnBookForm = document.getElementById('return-book-form');
const adminForm = document.getElementById('admin-form');

const signupbtn = document.getElementById('signup-btn');

// Login user
getBooks()

// Get books
async function getBooks() {
  try {
    const response = await axios.get(`${apiUrl}/books/getbooks`, {
      headers: {
        Authorization:token
      }
    });
    console.log(response)
    booksList.innerHTML = '';
    response.data.forEach(book => {
      const li = document.createElement('li');
      li.textContent = `id is ${book._id} and book is "${book.title}" by "${book.author}"(borrowed:${book.borrowed})`;
      booksList.appendChild(li);
    });
  } catch (error) {
    console.log(error)
    alert('Failed to get books');
  }
}

// Borrow a book
borrowBtn.addEventListener('click', async () => {
  const bookId = document.getElementById('book-id').value;
  
  try {
    await axios.post(`${apiUrl}/borrow/borrow`, { bookId }, {
      headers: {
        Authorization:token
      }
    });
    alert('Book borrowed successfully');
    getBooks();
  } catch (error) {
    console.log(error)
    if(error.response.data.message=="this book is already borrowed"){
      alert("this book is already borrowed")

    }    
    alert('Failed to borrow book');
  }
});

// Return a book
returnBtn.addEventListener('click', async () => {
  console.log("hi")
  const bookId = document.getElementById('return-book-id').value;
  
  try {
    const response=await axios.post(`${apiUrl}/borrow/return`, { bookId }, {
      headers: {
        Authorization:token
      }
    });
    console.log(response)
    alert('Book returned successfully');
    getBooks();
  } catch (error) {
    if(error.response.data.message=="this book is already returned"){
      alert("this book is already returned")

    }    
    console.log(error)
    alert('Failed to return book');
  }
});
