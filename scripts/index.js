var wordsSelected = [];
var teams = [];
var NUMBER_OF_WORDS = 25;
var COLOR_RED = "#ff0000";
var COLOR_YELLOW = "#ffff00";
var COLOR_BLUE = "#00eeee";
var COLOR_BLACK = "#808080";
var COLOR_GREEN = "#009000";
var SPYMASTERING = false;

function init_data() {
    var val = document.getElementById('wordlist').value;
    if (val === "2k") {
        data = data_2k.slice();
    } else {
        data = data_400.slice();
    }
}

function fire(){
    //get seed
    var seed = document.getElementById("seed").value;
    Math.seedrandom(seed.toLowerCase());

    //clear words
    wordsSelected = [];
    teams = [];
    init_data();

    //fire new board
    createNewGame();
    // document.getElementById("p1").innerHTML = wordsSelected;


}

function removeItem(array, index){
    if (index > -1) {
        console.log("index: " + index + ", word: " + array[index] + " removed.");
        array.splice(index, 1);
    }
}

function createNewGame(){
    document.getElementById("board").innerHTML = "";
    var trs = [];
    for(var i = 0; i < NUMBER_OF_WORDS; i++){
        if (!trs[i%5]){
            trs[i%5] = "";
        }
        var randomNumber = Math.floor(Math.random() * data.length);
        var word = data[randomNumber];
        wordsSelected.push(word);
        removeItem(data, randomNumber);
        trs[i%5] += "<div class=\"word\" id=\'"+ i +"\' onclick=\"clicked(\'" + i + "\')\"><div>" + word + "</div></div>";
    }
    for (var i = 0; i < trs.length; i++){
        document.getElementById("board").innerHTML += '<div class="row">'+trs[i]+'</div>'
    }
    //create teams
    for(var i = 0; i < 8; i++){
        teams.push(COLOR_RED);
        teams.push(COLOR_BLUE);
    }
    // one extra for team one
    if (Math.floor(Math.random() * 980) % 2 === 0) {
        teams.push(COLOR_RED);
    } else {
        teams.push(COLOR_BLUE);
    }
    for(var i = 0; i < 7; i++){
        teams.push(COLOR_YELLOW);
    }
    // push the assasin
    teams.push(COLOR_BLACK)
    shuffle(teams);

}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function clicked(value){
    console.log(`clicked: ${value} (${rgb2hex(document.getElementById(value).style.backgroundColor)})`);
    var word = wordsSelected[value];
    if ( !SPYMASTERING || rgb2hex(document.getElementById(value).style.backgroundColor) === COLOR_GREEN)
        document.getElementById(value).style.backgroundColor = teams[value];
    else
        document.getElementById(value).style.backgroundColor = COLOR_GREEN;
    if (teams[value] == "black"){
        document.getElementById(value).style.color = "white";
    }
}

function spyMaster(){
    for(var i = 0; i < NUMBER_OF_WORDS; i++){
        document.getElementById(i).style.backgroundColor = teams[i];
        if (teams[i] == "black"){
            document.getElementById(i).style.color = "white";
        }
    }
    SPYMASTERING = true;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.getElementById('seed').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      fire();
      return false;
    }
}

document.getElementById('wordlist').onchange = init_data;