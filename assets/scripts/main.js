$(document).ready(function () {
 
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
 var sounds = [];
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
  // code to run as soon as the page loads
  window.onload = function () {
    $("#pause").on("click", stop);
    $("#stop").on("click", reset);
    $("#play").on("click", start);
  };
  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  var time = 60 * 5;
 

  function reset() {

    time = 60*5;
    
 // DONE: Change the "display" div to "00:00."
 $("#display").text("00:00");
}

function start() {

  // DONE: Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}

function stop() {

  // DONE: Use clearInterval to stop the count here and set the clock to not be running.
  clearInterval(intervalId);
  clockRunning = false;
}

function count() {

  // DONE: increment time by 1,
  time--;
  if (time == 0 ){
    
  }

  // DONE: Get the current time, pass that into the timeConverter function,
  //       and save the result in a variable.
  var converted = timeConverter(time);
  console.log(converted);

  // DONE: Use the variable we just created to show the converted time in the "display" div.
  $("#display").text(converted);
}
function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}


});

