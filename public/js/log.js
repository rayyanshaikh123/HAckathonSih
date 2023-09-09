var firebaseConfig = {
  apiKey: "AIzaSyAIccTqte_ZIdgepA0OleZj-XkpAWcHFRo",
  authDomain: "login-and-register-b6be2.firebaseapp.com",
  databaseURL: "https://login-and-register-b6be2-default-rtdb.firebaseio.com",
  projectId: "login-and-register-b6be2",
  storageBucket: "login-and-register-b6be2.appspot.com",
  messagingSenderId: "670642182975",
  appId: "1:670642182975:web:aa2d67e5d9b704ed0ed18a",
};

firebase.initializeApp(firebaseConfig);
   
    const auth = firebase.auth()
    const database = firebase.database()
    
   
    function register () {
      
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var fname = document.getElementById('fname').value;
      var lname = document.getElementById('lname').value;
      var tel = document.getElementById('tel').value;
  
      var cpsw = document.getElementById('cpsw').value;
      if (password !== cpsw) {
          alert("Passwords do not match");
          return;
        }
  
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
     
    }
    if (validate_field(fname) == false || validate_field(tel) == false || validate_field(lname) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      
      var user = auth.currentUser
  
      
      var database_ref = database.ref()
  
     
      var user_data = {
          email: email,
          first_name: fname,
          last_name: lname,
          phone_no: tel,
          gender: getSelectedGender(),
       
        last_login : Date.now()
      
      }
  
      
      database_ref.child('users/' + user.uid).set(user_data)
  
      
      alert('Register succesfull')
      window.location.assign("login")
    })
    .catch(function(error) {
      
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  function login () {
    
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      
      var user = auth.currentUser
  
      
      var database_ref = database.ref()
  
    
      var user_data = {
        last_login : Date.now()
      }
  
      
      database_ref.child('users/' + user.uid).update(user_data)
  
    window.location.assign("home")
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
  function getSelectedGender() {
      var radios = document.getElementsByName("Gender");
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          return radios[i].nextElementSibling.textContent.trim();
        }
      }
      return "Not specified";
    }
function forgotPass() {
  const email = document.getElementById("email").value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset link sent to your email id");
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message;
    });
}
function out() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("logged out");
      window.location.assign("index.html");
    })
    .catch((error) => {
      alert("sorry currently our server is in maintaince");
      window.location.assign("home.html");
    });
}
function toggleProfile() {
  var profileContainer = document.getElementById("profileContainer");
  var hideButton = document.getElementById("hideButton");
  if (profileContainer.style.display === "block") {
    profileContainer.style.display = "none";
    hideButton.style.display = "none";
  } else {
    profileContainer.style.display = "block";
    hideButton.style.display = "block";
    fetchUserData();
  }
}

function fetchUserData() {
  var user = auth.currentUser;
  if (user) {
    var userId = user.uid;
    var userRef = database.ref("users/" + userId);

    userRef.once("value").then(function (snapshot) {
      var userData = snapshot.val();
      if (userData) {
        document.getElementById("userEmail").textContent = userData.email;
        document.getElementById("userName").textContent = userData.first_name + " " + userData.last_name;
        document.getElementById("userPhone").textContent = userData.phone_no;
      }
    });
  }
}

fetchUserData();
   