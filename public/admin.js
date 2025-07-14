

const apiUrl = 'http://localhost:4000'; // Replace with your API URL
let token = localStorage.getItem("token");
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


// Admin actions
addBookBtn.addEventListener('click', async () => {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  
  try {
    await axios.post(`${apiUrl}/books/add`, { title, author }, {
      headers: {
        Authorization:token
      }
    });
    alert('Book added successfully');
    getBooks();
  } catch (error) {
    console.log(error)
    alert('Failed to add book');
  }
});

removeBookBtn.addEventListener('click', async () => {
  const bookId = document.getElementById('remove-book-id').value;
  
  try {
    await axios.delete(`${apiUrl}/books/notadd/${bookId}`, {
      headers: {
        Authorization:token
      }
    });
    alert('Book removed successfully');
    getBooks();
  } catch (error) {
    console.log(error)
    if(error.response.data.message=="book not found"){
      alert("book not found")

    }  
    alert('Failed to remove book');
  }
});