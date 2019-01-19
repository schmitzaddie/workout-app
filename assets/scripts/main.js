$(document).ready(function () {
  var sounds = [];
  var config = {
    apiKey: "AIzaSyBQvk3ZKGc9LMbus4Ma39xV_NPobuQOu0o",
    authDomain: "workout-app-4ece3.firebaseapp.com",
    databaseURL: "https://workout-app-4ece3.firebaseio.com",
    projectId: "workout-app-4ece3",
    storageBucket: "workout-app-4ece3.appspot.com",
    messagingSenderId: "1003379802026"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

  function playRandomSound() {
    //An array to house all of the URLs of your sounds
    //insert sas file//
    var soundfile = sounds[Math.floor(Math.random() * sounds.length)];
    document.getElementById("inspo").innerHTML = "<embed src=\"" + soundfile + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
  }

  $(".dropbtn").click(function () {
    $("#myDropdown").toggleClass("show")
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = $(".dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });
});

