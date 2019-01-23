$(document).ready(function () {
  var playlistSelection = {
    best90s : [ "90's Best","PL5QA6aplcJ88GE47o2YEN35jKBX5R7Zyc"],
    pop : ["Pop", "PLChOO_ZAB22UB3y-qFBmFi_dk0tQhbn5C"],
    bestWorkout : ["Best Workout!","PLnZGnqvPbb9Pw_51eEx5ud1dhF4DrKjXV"],
    hipHop : ["Hip Hop","PLn3mS0NtJwSpOFcj8Gg2SMTUwXcsgoVeM"],
    superSaiyan : ["Super Saiyan!","PLe8RKAkuBycdBz-e0-JJXU2DNsgCuXyi0"],
    heavyRock : ["Heavy Rock","PLYfS6Plko3T4Xqjlu9Q-kVB2FQcobDk5u"]
  };
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

  var sounds = ["sound1", "sound2", "sound3", "sound4", "sound5", "sound6", "sound7", "sound8", "sound9"];

  document.getElementById("inspo").onclick = function (){
    var index = Math.floor(Math.random() * sounds.length);
    var id = sounds[index];
    var audioElement = document.getElementById(id);
    audioElement.pause();
    audioElement.play();
}
  
  $.each(playlistSelection, function(i,val){
    btn = $("<button class='btn btn-primary'>");
    btn.text(val[0]);
    btn.attr("id",i);
    btn.css("width","175px");
    $(btn).click(function(){
      newPlaylist(playlistSelection[this.id][1]);
    });
    $("#playlistButtons").append(btn);
  });


  $(".dropbtn").click(function () {
    $("#myDropdown").toggleClass("show")
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = $(".dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        };
      };
    };
  });

  $("#pause").on("click", stop);
  $("#stop").on("click", reset);
  $("#play").on("click", start);

  var intervalId;
  var clockRunning = false;
  var time = 3;


  function reset() {
    time = 10;
  }

  function start() {
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }

  function stop() {
    clearInterval(intervalId);
    clockRunning = false;
  }

  function count() {

    // DONE: increment time by 1,
    if (!time == 1) {
      time == 1;
    } else {
      time--;
    }
    var converted = timeConverter(time);
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

var newPlaylist = function (playlistID) {
  $("#selectPlaylist").empty()
  skip = $("<div id='skip' class='skip timer zmdi zmdi-skip-next col-md-3'>");
  prev = $("<div id='prev' class='skip timer zmdi zmdi-skip-previous col-md-3'>");
  $("#selectPlaylist").append(prev, skip);
  $(".skip").click( function() {
    if (this.id == "skip") {
      currentItem++;
    } else {
      currentItem--;
    };
    vidURL = "https://www.youtube.com/embed/" + youtubePlaylist.items[currentItem].contentDetails.videoId;
    $("#ytplayer").attr("src", vidURL);
  });
  var queryURL =  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId="
                  +playlistID+
                  "&key=AIzaSyCsAsCrQMs8kHpHEwtFqArNXzRZSqJ5kg8";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    currentItem = 0
    youtubePlaylist = response;
    vidURL = "https://www.youtube.com/embed/" + response.items[currentItem].contentDetails.videoId;
    $("#ytplayer").attr("src", vidURL);
  });
}
