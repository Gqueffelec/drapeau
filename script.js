var allFlagId = ["france", "belgique", "allemagne", "hollande", "pologne", "tcheque"];
var actualFlagId = allFlagId[0];
var flagIndex = 0;
var numberOfClic = 0;
var start = 0;
var end = 0;
var diff = 0;
var timer = 0;
var endGame = false;
var time;
var score = 0;
var clicPerFlag = 0;

$(document).ready(function () {
    popUp();
    $("#start").click(function () {
        $("#introduction").remove();
        nextFlag(flagIndex);
        start = new Date();
        $("body").removeClass("popup");
        $("#scoreBoard").show();
    })
    initialColor("france", "blue");
    initialColor("belgique", "yellow");
    initialColor("allemagne", "red");
    initialColor("hollande", "white");
    initialColor("pologne", "red");
    initialColor("tcheque", "red");
    updateLevel();
    updateClic();
    updateScore();
});

$(function () {
    switchColor("france", "blue", "red", "white");
    switchColor("belgique", "black", "red", "yellow");
    switchColor("hollande", "blue", "red", "white");
    switchColor("allemagne", "black", "red", "yellow");
    switchColor("pologne", "white", "red", null);
    switchColor("tcheque", "white", "red", "blue");
})

$(function () {
    $('#valider').click(function () {
        if (flagIndex == 5) {
            endGame = true;
            popUp();
            $("#endGame").html("Bien joué ! <br> Votre temps est de = " + time + " avec " + numberOfClic + " clics")
        }
    })
})

$(function () {
    $("#valider").click(function () {
        flagIndex++;
        nextFlag(flagIndex);
        updateScore()
        $(this).hide();
    })
})

function initialColor(flagDiv, color) {
    $("#" + flagDiv).children().filter("div").children().each(function () {
        $(this).addClass(color);
    });
}

function switchColor(flagDiv, color1, color2, color3) {

    $("#" + flagDiv).children().filter("div").children().click(function () {
        numberOfClic++;
        clicPerFlag++;
        updateClic();

        let color = $(this).attr("class");
        if (color3 == null) {
            color3 = color1;
        }
        switch (color) {
            case color1:
                $(this).removeClass(color1).addClass(color2);
                break;
            case color2:
                $(this).removeClass(color2).addClass(color3);
                break;
            case color3:
                $(this).removeClass(color3).addClass(color1);
                break;
        }
        let soluce;
        switch (flagIndex) {
            case 0:
                soluce = "bluewhitered";
                checkSolution(soluce, 3);
                break;
            case 1:
                soluce = "blackyellowred";
                checkSolution(soluce, 3);
                break;
            case 2:
                soluce = "blackredyellow";
                checkSolution(soluce, 3);
                break;
            case 3:
                soluce = "redwhiteblue";
                checkSolution(soluce, 3);
                break;
            case 4:
                soluce = "whitered";
                checkSolution(soluce, 1);
                break;
            case 5:
                soluce = "whiteredbluered";
                checkSolution(soluce, 3);
                break;
            default:
                break;
        }
    })
}

function nextFlag(index) {
    $(".drapeau").hide();
    $("#" + allFlagId[index]).show();
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
    $("#scoreBoard").hide();
    $('#valider').hide();
    if (!endGame) {
        $("#endGame").hide();
    } else {
        $("#endGame").show();
        $("#introduction").hide();
    }
}

function updateScore() {
    $('#score').html("Score : " + score);
}

function calculPoints(optimalClicNumber, actualClicNumber) {
    console.log(actualClicNumber - optimalClicNumber);
}