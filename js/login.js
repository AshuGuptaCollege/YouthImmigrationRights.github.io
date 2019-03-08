//login.js
//youth immigration project
//eecs 397
//version 2

//global variable for logging in
var timeout = 1250;

//create an account on the computer
function signUp() {
  var secondpasswordin = document.getElementById("password-input-two").value;
  var usernamein = document.getElementById("username-input").value;
  var passwordin = document.getElementById("password-input").value;

  if (secondpasswordin != passwordin) {
    document.getElementById("login-confirmation").innerHTML = "Account Sign-Up Failed! Passwords must match.";
    restart(timeout);
    return false;
  }

  if (usernamein == "Guest") {
    document.getElementById("login-confirmation").innerHTML = "Account Sign-Up Failed! 'Guest' is an illegal username.";
    restart(timeout);
    return false;
  }

  if ((passwordin == "") || (usernamein == "") || (passwordin.length < 5) || (usernamein.length < 5)) {
    document.getElementById("login-confirmation").innerHTML = "Account Sign-Up Failed! Usernames/Passwords must be longer than 5 characters.";
    restart(timeout);
    return false;
  }

  try {
    localStorage.setItem("youth-immi-user", usernamein);
    localStorage.setItem("youth-immi-pw", passwordin);
    document.getElementById("login-confirmation").innerHTML = "Account Sign-Up Successful!";
    login();
    setTimeout("location.href = 'index.html'", timeout);
    return true;
  } catch (e) {

  }
  document.getElementById("login-confirmation").innerHTML = "Account Sign-Up Failed!";
  restart(timeout);
}

//try to login to a existing account
function login() {
  var usernamein = document.getElementById("username-input").value;
  var passwordin = document.getElementById("password-input").value;
  //try {
  var u = getUsername();
  var p = getPassword();
  console.log(u);
  console.log(p);
  console.log(usernamein);
  console.log(passwordin);
  if ((usernamein == u) && (u != "Guest")) {
    if ((passwordin == p) && (p != "")) {
      localStorage.setItem("youth-immi-logged-in", "true");
      document.getElementById("login-confirmation").innerHTML = "Account Login Successful! You will be redirected to the homepage.";
      setTimeout("location.href = 'index.html'", timeout);
      return true;
    }
  }
  //} catch (e) {

  //}
  document.getElementById("login-confirmation").innerHTML = "Account Login Failed! Wrong Username/Password.";
  restart(timeout);
  return false;
}

//get username
function getUsername() {
  try {
    var usr = localStorage.getItem("youth-immi-user");
    if ((usr == null) || (usr == "")) {
      usr = "Guest";
    }
    return usr;
  } catch (e) {

  }
  return "Guest";
}

//get password
function getPassword() {
  try {
    var pw = localStorage.getItem("youth-immi-pw");
    if ((pw == null) || (pw == "")) {
      pw = "";
    }
    return pw;
  } catch (e) {

  }
  return "";
}

//get login status
function toggleLoginStatus() {
  try {
    var lg = localStorage.getItem("youth-immi-logged-in");
    if ((lg == null) || (lg == "")) {
      localStorage.setItem("youth-immi-logged-in", "true");
    } else {
      if (lg == "true") {
        localStorage.setItem("youth-immi-logged-in", "false");
        alert("you have logged out!");
      } else {
        localStorage.setItem("youth-immi-logged-in", "true");
      }
    }
    main();
  } catch (e) {

  }
}

//get login status
function getLoginStatus() {
  try {
    var lg = localStorage.getItem("youth-immi-logged-in");
    if ((lg == null) || (lg == "")) {
      lg = false;
    } else {
      if (lg == "true") {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {

  }
  return false;
}

//set username HTML label in nav bar if logged in
function setUsernameLabel() {
  try {
    var user = getUsername();
    if (getLoginStatus() == true) {
      document.getElementById("username-label").innerHTML = "Hi " + user + "!";
    } else {
      document.getElementById("username-label").innerHTML = "Hi Guest!";
      //document.getElementById("username-label").onclick = nothing();
    }
  } catch (e) {

  }
}

function nothing() {

}

//function to edit the login/logout button based on whether you're logged in or not
function setLoginButton() {
  var btn_label = 'Login';
  var btn_style = '<span id="login-btn-span" class="glyphicon glyphicon-log-in"></span>';
  try {
    if (getLoginStatus() == true) {
      btn_label = 'Logout';
      btn_style = '<span id="login-btn-span" class="glyphicon glyphicon-log-out"></span>';
      document.getElementById("login-btn").innerHTML = btn_label + " " + btn_style;
      document.getElementById("login-btn").setAttribute("onClick", "javascript: toggleLoginStatus();");
    }
    document.getElementById("login-btn").innerHTML = btn_label + " " + btn_style;
  } catch (e) {

  }
}

//function to run all onload functions (except test.html)
function main() {
  setUsernameLabel();
  setLoginButton();
}