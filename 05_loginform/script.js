const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const loginFormData = new FormData(loginForm);
  console.log(loginFormData);
  for (const [key, value] of loginFormData.entries()) {
    console.log(key, value);
  }
  const name = loginFormData.get("userName");
  const email = loginFormData.get("userEmail");
  const password = loginFormData.get("userPassword");
  console.log(name, email, password);
});
