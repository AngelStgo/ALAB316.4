const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");

// create error messages 
function createErrorMessage(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message");
  return errorMessage;
};

// displaying error messages
function displayErrors(errors) {
  errorDisplay.innerHTML = ""; 
  errors.forEach((error) => {
    const errorMessage = createErrorMessage(error);
    errorDisplay.appendChild(errorMessage);
  });
}

// Registration form validation
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission to handle validation

  let errors = [];
  const formData = new FormData(registrationForm);

  const username = formData.get("username").toLowerCase();
  const email = formData.get("email").toLowerCase();
  const password = formData.get("password");
  const passwordCheck = formData.get("passwordCheck");
  const terms = formData.get("terms");

  // Username validation
  if (!username || username.length < 4) {
    errors.push("Username must be at least 4 characters long.");
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    errors.push("Username cannot contain special characters or whitespace.");
  }
  if (username.length > 4 && !hasTwoUniqueCharacters(username)) {
    errors.push("Username must contain at least two unique characters.");
  }
  if (localStorage.getItem(username)) {
    errors.push("Username is already taken.");
  }
//! add an alert method 
  
  

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Please provide a valid email.");
  }
  if (email.includes("example.com")) {
    errors.push("Email cannot be from 'example.com' domain.");
  }
  
  

  // Password validation
  if (password.length < 12) {
    errors.push("Password must be at least 12 characters long.");
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errors.push(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
  if (password.toLowerCase().includes("password")) {
    errors.push("Password cannot contain the word 'password'.");
  }
  if (password.includes(username)) {
    errors.push("Password cannot contain the username.");
  }
  if (password !== passwordCheck) {
    errors.push("Passwords must match.");
  }

  // Terms and conditions validation
  if (!terms) {
    errors.push("You must agree to the terms and conditions.");
  }


  if (errors.length > 0) {
    displayErrors(errors);
    return;
  }
  console.error(errors);


  // Clear the form fields
  registrationForm.reset();
  errorDisplay.innerHTML = "<p>Registration successful!</p>";
});

// Login form validation
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  let errors = [];
  const formData = new FormData(loginForm);
  const username = formData.get("username").toLowerCase();
  const password = formData.get("password");

  // Username validation
  if (!username) {
    errors.push("Username cannot be blank.");
  }


  // Display errors if any
  if (errors.length > 0) {
    displayErrors(errors);
    return;
  }

  // If no errors, log the user in
  loginForm.reset();
  errorDisplay.innerHTML = `<p>Login successful! ${
    persist ? "You will be kept logged in." : ""
  }</p>`;
});

// Helper function to check if username has at least 2 unique characters
function hasTwoUniqueCharacters(username) {
  const uniqueChars = new Set(username);
  return uniqueChars.size >= 2;
}
