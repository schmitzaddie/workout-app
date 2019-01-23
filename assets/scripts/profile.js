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

      if (localStorage.getItem("userID") === null) {
        window.location.href = "https://schmitzaddie.github.io/workout-app/";
      } else {
        
        var userInfo = database.ref("users/"+localStorage.getItem("userID"));
        userInfo.once('value', function (snapshot) {
            $("#username").text(snapshot.val().accntDetails.userName)
            if ('workoutSummery' in snapshot.val()) {
                wrkSum = snapshot.val().workoutSummery;
                $.each(wrkSum, function(i,v){
                    $("#workout").append(i+": "+v);
                });
            } else {
                $("#workout").append("You haven't completed any workouts with us yet!");
            };
          });
      }

})