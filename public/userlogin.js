

const apiUrl = 'http://localhost:4000'; // Replace with your API URL
let token = '';
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
const adminloginBtn = document.getElementById('adminlogin-btn');

// Login user

loginBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
    console.log(response)
    token = response.data.token;
    localStorage.setItem("token",token)
    // Show different views based on user type
  
    window.location.href = "./index.html";
  } catch (error) {
    console.log(error)
    alert('Login failed');
  }
});
signupbtn.addEventListener('click', async () => {
    const username = document.getElementById('usernames').value;
    const password = document.getElementById('passwords').value;
    
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, { username, password });
      console.log(response)
      alert("signup done")
      
      
  
    } catch (error) {
      console.log(error)
      if(error.response.data.message=="user already exists"){
        alert("user already exists")
  
      } 
      alert('signup failed');

    }
  });


adminloginBtn.addEventListener('click', async () => {
    const username = document.getElementById('usernamess').value;
    const password = document.getElementById('passwordss').value;
    
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
      console.log(response)
      token = response.data.token;
      localStorage.setItem("token",token)
      
  
      // Show different views based on user type
    
      window.location.href = "./admin.html";
    } catch (error) {
      console.log(error)
      alert('Login failed');
    }
  });

