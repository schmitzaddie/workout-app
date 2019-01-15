
$( document ).ready(function() {
   


function playRandomSound(){

    //An array to house all of the URLs of your sounds
    //insert sas file//
    var sounds = [];
    
    //This line will select a random sound to play out of your provided URLS
    var soundfile = sounds[Math.floor(Math.random()*sounds.length)];
    
    //Find the player element that you created and generate an embed file to play the sound within it
    document.getElementById("player").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
 }

});