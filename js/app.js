$(document).ready(function () {
  //login google
  var user = null;
  var $loginBtn = $('#start-login');

  $loginBtn.on('click', googleLogin);

  var provider = new firebase.auth.GoogleAuthProvider();
  function googleLogin() {

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        guardaDatos(result.user);
        console.log(user.displayName);
        console.log(user.photoURL);
        firebase.database().ref('users/' + user.uid).set({
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL
        });
        console.log('todo bien');
        window.location.href = '../views/profile.html';
        // ...

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
    /* Obteniendo datos del usuario actual*/
    var $username = $('.name');
    var $userEmail = $('.directionMail');
    var $profilePhoto = $('.small');
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var name = user.displayName;
        var email = user.email;
        var photoUrl = user.photoURL;
        var emailVerified = user.emailVerified;
        var uid = user.uid;
        console.log(user);
        $username.text(name);
        $userEmail.text(email);
        $profilePhoto.attr('src', photoUrl);
      } else {
        // No user is signed in.
      }
    });

    /*funcion que guarad  datos automaticamente*/
    function guardaDatos(user) {
      var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
      }
      firebase.database().ref('datauser')
        .push(usuario)

    };

    /*Escribir  en  base  de datos*/
    $('.guardar').click(function () {
      firebase.database().ref('datauser')
        .set({
        });
    });

// Cerrar sesión
$('.close').click(function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log('Cerrando sesión...');
    $(location).attr('href', '../index.html');
  }).catch(function (error) {
    // An error happened.
  });
});









  })