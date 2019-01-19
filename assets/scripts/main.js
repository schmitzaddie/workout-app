
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

     function playRandomSound() {



        //An array to house all of the URLs of your sounds
        //insert sas file//
        var sounds = [];

        //This line will select a random sound to play out of your provided 
        var soundfile = sounds[Math.floor(Math.random() * sounds.length)];

        //Find the player element that you created and generate an embed file to play the sound within it
        document.getElementById("inspo").innerHTML = "<embed src=\"" + soundfile + "\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
    }


   


});