$(document).ready(function () {
    var newWorkOut = {};
    var showingNW = false;
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
        var userInfo = database.ref("users/" + localStorage.getItem("userID"));
        userInfo.once('value', function (snapshot) {
            console.log(snapshot.val())
            $("#username").text(snapshot.val().accntDetails.userName)
            if ('workoutSummery' in snapshot.val()) {
                wrkSum = snapshot.val().workoutSummery;
                $.each(wrkSum, function (i, v) {
                    $("#workout").append(i + ": " + v);
                });
            } else {
                $("#workout").append("You haven't completed any workouts with us yet!");
            };
        });
    };

    $('#newWrk').on('click', function () {
        if (!showingNW) {
            var varQueryURL = "https://wger.de/api/v2/exercisecategory/?format=json"
            API_KEY = "79b9f9a7451896388ccd98b0e512c33ea8d732c4";
            $.ajax({
                url: varQueryURL,
                method: "GET",
                headers: {
                    "Authorization": "Token " + API_KEY
                }
            }).then(function (response) {
                var mGroup = {};
                for (var i = 0; i < response.count; i++) {
                    mGroup[response.results[i].name] = response.results[i].id;
                };
                $.each(mGroup, function (index, value) {
                    exerciseURL = "https://wger.de/api/v2/exercise/?category=" + value + "&language=2&license_author=wger.de&format=json";
                    newBtn = $("<button class='btn btn-primary'>");
                    newBtn.attr("data-toggle", "modal");
                    newBtn.attr("data-target", "#wrkModal");
                    newBtn.attr("data-url", exerciseURL);
                    newBtn.text(index);
                    newBtn.attr("id", index.toLowerCase());
                    $(newBtn).click(function () {
                        newQuery($(this).attr("data-url"));
                    });
                    $("#wrkButtons").append(newBtn);
                });
            });
            showingNW = true;

        }
        $("#subWorkout").click(function(){
            database.ref("users/" + localStorage.getItem("userID") + "/workout").update(newWorkOut);
        });

        var newQuery = function (varQueryURL) {
            $("#modalBody").empty();
            API_KEY = "79b9f9a7451896388ccd98b0e512c33ea8d732c4";
            $.ajax({
                url: varQueryURL,
                method: "GET",
                headers: {
                    "Authorization": "Token " + API_KEY
                }
            }).then(function (response) {
                {
                    $.each(response.results, function (i, v) {
                        currentEx = response.results[i];
                        newBtn = $("<button class='btn btn-primary'>");
                        newBtn.attr("data-discrpt", currentEx.description)
                        newBtn.attr("id", currentEx.id);
                        newBtn.text(currentEx.name);
                        $(newBtn).click(function(e){
                            e.preventDefault();
                            newWorkOut[$(this).text()] = [currentEx.description];
                            console.log(newWorkOut);
                            $("exToAdd").append("<span>" + $(this).text() + ", ");
                            $("#subWorkout").css("display","block");
                        });
                        $("#modalBody").append(newBtn);
                    });
                };
                console.log(response);
            });
        }

    });

})