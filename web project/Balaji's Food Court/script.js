let loginBtn = document.querySelector(".login_btn")
let registerBtn = document.querySelector(".register_btn")
let loginForm = document.getElementById("card_three")
let registerForm = document.getElementById("card_four")

//!Register Button Functionality
registerBtn.addEventListener("click", () => {
  registerBtn.style.color = "white"
  registerBtn.style.background = "#d84315"
  loginBtn.style.color = "#d84315"
  loginBtn.style.background = "transparent"
  loginForm.classList.remove("active")
  loginForm.classList.add("hidden")
  registerForm.classList.remove("hidden")
  registerForm.classList.add("active")
})

//!Login Button Functionality
loginBtn.addEventListener("click", () => {
  loginBtn.style.color = "white"
  loginBtn.style.background = "#d84315"
  registerBtn.style.color = "#d84315"
  registerBtn.style.background = "transparent"
  registerForm.classList.remove("active")
  registerForm.classList.add("hidden")
  loginForm.classList.remove("hidden")
  loginForm.classList.add("active")
})

//!Register Form Functionality
let createUser = document.getElementById("register_form")
createUser.addEventListener("submit", (e) => {
  e.preventDefault()
  let regName = document.getElementById("regName").value.trim()
  let regEmail = document.getElementById("regEmail").value.trim()
  let regPassword = document.getElementById("regPassword").value
  let regConfirmPassword = document.getElementById("regConfirmPassword").value
  let regErrorInfo = document.getElementById("regErrorInfo")

  regErrorInfo.style.color = "red"
  if (regName == "" || regName.length < 3) {
    regErrorInfo.innerHTML = "Please enter a name of min 3 characters"
    return;
  }
  if (regEmail == "" || !regEmail.includes("@") || !regEmail.includes(".")) {
    regErrorInfo.innerHTML = "Enter a valid email"
    return;
  }
  if (regPassword.length < 6) {
    regErrorInfo.innerHTML = "Please enter a password of min 6 characters"
    return;
  }
  if (regPassword != regConfirmPassword) {
    regErrorInfo.innerHTML = "Password donot match"
    return;
  }

  regErrorInfo.innerHTML = "Account Created Successfully!"
  regErrorInfo.style.color = "green"

  let userDetails = {
    regName,
    regEmail,
    regPassword
  }
  localStorage.setItem("user", JSON.stringify(userDetails))
  createUser.reset()
  setTimeout(() => {
    loginBtn.click()
    regErrorInfo.innerHTML = ""
  }, 2000)
})

//!Login Form Functionality
let signInUser = document.getElementById("login_form")
signInUser.addEventListener("submit",(e)=>{
  e.preventDefault()
  let loginEmail = document.getElementById("loginEmail").value.trim()
  let loginPassword = document.getElementById("loginPassword").value
  let loginErrorInfo = document.getElementById("loginErrorInfo")
  loginErrorInfo.style.color="red"
  let user = JSON.parse(localStorage.getItem("user"))
  
  if(user==null){
    loginErrorInfo.innerHTML="Please Register your account"
    return;
  }

  if(user.regEmail == loginEmail && user.regPassword==loginPassword){
    loginErrorInfo.innerHTML = `Successfully Logged In`
    loginErrorInfo.style.color="green"
    setTimeout(()=>{
     location.href="Home.html"
    },1000) 
  }
  else{
    loginErrorInfo.innerHTML="Invalid Credentials"
    return;
  }
})