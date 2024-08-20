const signInButton = document.getElementById("signIn");
const signUpButton = document.getElementById("signUp");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const signUpForm = document.querySelector(".sign-up-container form");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const name = signUpForm.querySelector('input[type="text"]').value.trim();
  const email = signUpForm.querySelector('input[type="email"]').value.trim();
  const password = signUpForm.querySelector('input[type="password"]').value.trim();

  if (name === "" || email === "" || password === "") {
    return; 
  }

  alert("Sign Up functionality is not implemented yet.");
});

const signInForm = document.querySelector(".sign-in-container form");
signInForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const email = signInForm.querySelector('input[type="email"]').value.trim();
  const password = signInForm.querySelector('input[type="password"]').value.trim();

  if (email === "" || password === "") {
    return; 
  }

  window.location.href = "index.html";
});