$(document).ready(function () {
  var config = {
    apiKey: 'AIzaSyBQvk3ZKGc9LMbus4Ma39xV_NPobuQOu0o',
    authDomain: 'workout-app-4ece3.firebaseapp.com',
    databaseURL: 'https://workout-app-4ece3.firebaseio.com',
    projectId: 'workout-app-4ece3',
    storageBucket: 'workout-app-4ece3.appspot.com',
    messagingSenderId: '1003379802026'
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  $('.input').on('focus', function (e) {
    e.preventDefault();
    $('.login').addClass('clicked');
  });

  $('.login').on('submit', function (e) {
    userID = 0;
    e.preventDefault();
    user = $('#user').val();
    for (var i = 0; i < user.length; i++) {
      userID += user.charAt(i).toLowerCase().charCodeAt(0).toString(16);
    };
    database.ref("users").once('value', function (snapshot) {
      console.log(snapshot.val())
      if (snapshot.hasChild(userID)) {
        if (snapshot.val()[userID].accntDetails.userPassword === $('#pass').val()) {
          localStorage.setItem("userID",userID);
          window.location.href = 'https://schmitzaddie.github.io/workout-app/userprofile.html';
        } else {
          console.log("wrong pass");
          $('.login').addClass('shake');
        setTimeout(function () {
          $('.login').removeClass('shake');
        }, 1000);        
        }
      } else {
        console.log("bad username");
        $('.login').addClass('shake');
        setTimeout(function () {
          $('.login').removeClass('shake');
        }, 1000);
      }
    });
  });

  $('.accntDetails').on('click', function (e) {
    e.preventDefault();
    $('.login').removeClass('expand');
  });
  $('#signUp').on('click', function (e) {
    var userID = 0;
    e.preventDefault();
    accntDetails = {
      userName: $('#userName').val(),
      userEmail: $('#email').val(),
      userPassword: $('#password').val()
    };
    for (var i = 0; i < accntDetails.userName.length; i++) {
      userID += accntDetails.userName.charAt(i).toLowerCase().charCodeAt(0).toString(16);
    };
    if ($('#confirmPassword').val() === accntDetails.userPassword
      && accntDetails.userEmail.length > 4 && accntDetails.userName.length > 4) {
      ////////////////////////////////////////////////////////////////////
      database.ref('users/' + userID).update({ accntDetails });
      $('#newUserModal').modal('hide');
    } else {
      console.log('please enter valid info');
    };
  });
});
