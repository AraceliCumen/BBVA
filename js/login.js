$(document).ready(function() {
  // Inicializando Firebase
  var config = {
    apiKey: "AIzaSyAjNJLqG0zs1iy-VHo1NueO4DRQzEaDFdE",
    authDomain: "producto-final-8583e.firebaseapp.com",
    databaseURL: "https://producto-final-8583e.firebaseio.com",
    projectId: "producto-final-8583e",
    storageBucket: "producto-final-8583e.appspot.com",
    messagingSenderId: "452395891662"
  };

  firebase.initializeApp(config);

  // Funcion de acceso mediante una cuenta de Google
  function IngresoGoogle() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // Informacion del usurio resgistrado
        var user = result.user;
        window.location.href = 'principal.html';
      }).catch(function(error) {
        // Manejo de errores
        var errorCode = error.code;
        var errorMessage = error.message;
        // El correo electrónico utilizado de la cuenta del usuario
        var email = error.email;
        // El firebase.auth.AuthCredential tipo que se utilizado
        var credential = error.credential;
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
    } else {
      firebase.auth().signOut();
    }
  };

  // Funcion de acceso mediante una cuenta de Facebook
  function IngresoFacebook() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('public_profile');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // Informacion del usuario resgistrado
        var user = result.user;
        // console.log(user);
        var name = user.displayName;
        window.location.href = 'principal.html';
      }).catch(function(error) {
        //  Manejo de errores
        var errorCode = error.code;
        var errorMessage = error.message;
        // El correo electrónico utilizado de la cuenta del usuario
        var email = error.email;
        // El firebase.auth.AuthCredential tipo que se utilizado
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
    } else {
      firebase.auth().signOut();
    }
  };

  // Eventos para inicio sesión
  $('#start-login').on('click', IngresoGoogle);
  $('#start-facebook').on('click', IngresoFacebook);

  // Eventos para inicio sesión
  $('#start-login').on('click', IngresoGoogle);
  $('#start-facebook').on('click', IngresoFacebook);

  // Funcion para extraer datos de usuario
    var $username = $('#username');
    // var $userEmail = $('.directionMail');
    var $profilePhoto = $('#usernew');
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // El usuario ha iniciado sesión
        var name = user.displayName;
        var email = user.email;
        var photoUrl = user.photoURL;
        var emailVerified = user.emailVerified;
        var uid = user.uid;
        console.log(user);
        $username.text(name);
        // $userEmail.text(email);
        $profilePhoto.attr('src', photoUrl);
      } else {
        // Ningún usuario ha iniciado sesión
      }
    });

});
