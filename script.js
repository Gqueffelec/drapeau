var allFlagId = ["france", "belgique", "allemagne", "hollande", "pologne", "tcheque"];
var allColorSwitch = ["blue", "green", "red", "yellow", "black", "white"];
var actualFlagId = allFlagId[0];
var flagIndex = 0;
var numberOfClic = 0;
var start = 0;
var end = 0;
var diff = 0;
var timer = 0;
var endGame = false;
var time;
var clicPerFlag = 0;
var switchColorEnable = true;
var scoreCounter = function () {
    var scoreCount = 0;

    function addPoints(value) {
        scoreCount += value;
    };
    return {
        increase: function (value) {
            addPoints(value);
        },
        decrease: function () {
            addPoints(-1);
        },
        getScore: function () {
            return scoreCount;
        }
    }
}
var mainScore = scoreCounter();

window.onbeforeunload = function (event) {
    if (flagIndex < allColorSwitch.length) {
        saveData();
    }
}

$(document).ready(function () {
    popUp();
    $("#start").click(function () {
        $("#introduction").remove();
        nextFlag(flagIndex);
        start = new Date();
        $("body").removeClass("popup");
        $("#scoreBoard").show();
        $("#time").show();
    })
    initialize();
})

$(function () {
    $("#valider").click(function () {
        flagIndex++;
        nextFlag(flagIndex);
        updateScore()
        $(this).hide();
        if (flagIndex == 6) {
            endGame = true;
            popUp();
            $("#endGame").html("Bien joué ! <br> Vous avez réalisé : " + mainScore.getScore + "points avec " + numberOfClic + " clics")
        }
        switchColorEnable = true;
    })
})

function initialColor(flagDiv, color) {
    $("#" + flagDiv).children().filter("div").children().each(function () {
        $(this).addClass(color);
    });
}

function switchColor(flagDiv) {
    $("#" + flagDiv).children().filter("div").children().click(function () {
        if (switchColorEnable) {
            numberOfClic++;
            clicPerFlag++;
            updateClic();
            let color = $(this).attr("class");
            let newColorIndex = allColorSwitch.indexOf(color) + 1;
            if (newColorIndex == 6) {
                newColorIndex = 0;
            }
            let newColor = allColorSwitch[newColorIndex];
            $(this).removeClass(color).addClass(newColor);
            let soluce;
            switch (flagIndex) {
                case 0:
                    soluce = "bluewhitered";
                    checkSolution(soluce, 7);
                    break;
                case 1:
                    soluce = "blackyellowred";
                    checkSolution(soluce, 6);
                    break;
                case 2:
                    soluce = "blackredyellow";
                    checkSolution(soluce, 3);
                    break;
                case 3:
                    soluce = "redwhiteblue";
                    checkSolution(soluce, 4);
                    break;
                case 4:
                    soluce = "whitered";
                    checkSolution(soluce, 3);
                    break;
                case 5:
                    soluce = "whiteredbluered";
                    checkSolution(soluce, 7);
                    break;
                default:
                    break;
            }
        }
    })
}

function nextFlag(index) {
    $(".drapeau").hide();
    $("#" + allFlagId[index]).show();
    updateLevel();
    if (index != 6) {
        start = new Date();
        chrono();
    } else {
        $('#time').hide();
    }
}

function checkSolution(soluce, optimalClicByCountry) {
    let reponse = "";
    $("#" + allFlagId[flagIndex]).children().last().children().each(function () {
        reponse += $(this).attr('class');
    })
    if (soluce == reponse) {
        calculPoints(optimalClicByCountry, clicPerFlag);
        clearTimeout(timer);
        $("#valider").show();
        clicPerFlag = 0;
        switchColorEnable = false;
    }
}

function updateLevel() {
    $('#level').html("Niveau " + flagIndex + "/6 !");
}

function updateClic() {
    $('#clic').html("Nombre de clics : " + numberOfClic);
}

function chrono() {
    end = new Date();
    diff = end - start;
    diff = new Date(diff);
    var msec = diff.getMilliseconds();
    var sec = diff.getSeconds();
    var min = diff.getMinutes();
    if (msec < 10) {
        msec = "00" + msec
    } else if (msec < 100) {
        msec = "0" + msec
    }
    time = addZero(min) + ":" + addZero(sec) + ":" + msec;
    $('#time').html(time);
    timer = setTimeout("chrono()", 10);
}

function addZero(nombre) {
    if (nombre < 10) {
        return "0" + nombre;
    } else {
        return nombre;
    }
}

function popUp() {
    $("body").addClass("popup");
    $('.drapeau').hide();
    $('#time').hide();
    $("#scoreBoard").hide();
    $('#valider').hide();
    if (!endGame) {
        $("#endGame").hide();
    } else {
        $("#endGame").show();
        $("#introduction").hide();
        localStorage.clear();
    }
}

function updateScore() {
    $('#score').html("Score : " + mainScore.getScore());
}

function calculPoints(optimalClicNumber, actualClicNumber) {
    let clicScore = actualClicNumber - optimalClicNumber;
    if (clicScore == 0 && diff.getSeconds() <= optimalClicNumber - 2) {
        mainScore.increase(3);
    } else if (clicScore == 0) {
        mainScore.increase(2);
    } else {
        mainScore.increase(1);
    }
    updateScore();
}

function initialize() {
    initialColor("france", "blue");
    initialColor("belgique", "yellow");
    initialColor("allemagne", "red");
    initialColor("hollande", "white");
    initialColor("pologne", "red");
    initialColor("tcheque", "red");
    switchColor("france", );
    switchColor("belgique", );
    switchColor("hollande", );
    switchColor("allemagne", );
    switchColor("pologne", );
    switchColor("tcheque", );


    const save = JSON.parse(localStorage.getItem("save"));
    if (save == null || save.level == 0) {
        numberOfClic = 0;
        flagIndex = 0;
    } else {
        mainScore.increase(save.score);
        numberOfClic += save.clicNumber;
        flagIndex = save.level;
    }
    updateLevel();
    updateClic();
    updateScore();
}

function saveData() {
    const save = {
        level: flagIndex,
        "score": mainScore.getScore(),
        "clicNumber": numberOfClic
    };
    localStorage.setItem("save", JSON.stringify(save));
    return false;
}