var allColorSwitch = ["blue", "green", "red", "yellow", "black", "white"];
var endGame = false;
var switchColorEnable = true;
var actualFlagId = allFlag[levelCounter.getValue()].getCountry();

window.onbeforeunload = function (event) {
    if (levelCounter.getValue() < allFlag.length) {
        saveData();
    }
}

$(document).ready(function () {
    popUp();
    $("#start").click(function () {
        $("#introduction").remove();
        nextFlag(levelCounter.getValue());
        start = new Date();
        $("body").removeClass("popup");
        $("#scoreBoard").show();
        $("#time").show();
        $("#joker").show();
    })
    initialize();
})

$(function () {
    $("#valider").click(function () {
        levelCounter.increase(1)
        nextFlag(levelCounter.getValue());
        updateScore()
        $(this).hide();
        if (levelCounter.getValue() == 6) {
            endGame = true;
            popUp();
            $("#endGame").html("Bien joué ! <br> Vous avez réalisé : " + scoreCounter.getValue() + " points avec " + clicCounter.getValue() + " clics")
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
            clicCounter.increase(1);
            clicPerFlagCounter.increase(1);
            updateClic();
            let color = $(this).attr("class");
            let newColorIndex = allColorSwitch.indexOf(color) + 1;
            if (newColorIndex == 6) {
                newColorIndex = 0;
            }
            let newColor = allColorSwitch[newColorIndex];
            $(this).removeClass(color).addClass(newColor);
            checkSolution();
        }
    })
}

function nextFlag(index) {
    if (index != 6) {
        $(".drapeau").hide();
        $("#" + allFlag[index].getCountry()).show();
        updateLevel();
        start = new Date();
        chrono();
    } else {
        $('#time').hide();
    }
}

function checkSolution() {
    var soluce = allFlag[levelCounter.getValue()].getColors();
    var optimalClic = allFlag[levelCounter.getValue()].getOptmimalClics();
    var reponse = new Array(soluce.length);
    $("#" + allFlag[levelCounter.getValue()].getCountry()).children().last().children().each(function (i) {
        reponse[i] = $(this).attr('class');
    })
    if (levelCounter.getValue() == 5) {
        reponse.pop();
    }
    if (JSON.stringify(soluce) === JSON.stringify(reponse)) {
        calculPoints(optimalClic, clicPerFlagCounter.getValue());
        clearTimeout(timer);
        $("#valider").show();
        clicPerFlagCounter.decrease(clicPerFlagCounter.getValue());
        switchColorEnable = false;
    }
}


function updateLevel() {
    $('#level').html("Niveau " + levelCounter.getValue() + "/6 !");
}

function updateClic() {
    $('#clic').html("Nombre de clics : " + clicCounter.getValue());
}

function popUp() {
    $("body").addClass("popup");
    $('.drapeau').hide();
    $('#time').hide();
    $("#scoreBoard").hide();
    $('#valider').hide();
    $('#joker').hide();
    if (!endGame) {
        $("#endGame").hide();
    } else {
        $("#endGame").show();
        $("#introduction").hide();
        localStorage.clear();
    }
}

function updateScore() {
    $('#score').html("Score : " + scoreCounter.getValue());
}

function calculPoints(optimalClicNumber, actualClicNumber) {
    let clicScore = actualClicNumber - optimalClicNumber;
    if (clicScore == 0 && diff.getSeconds() <= optimalClicNumber - 2) {
        scoreCounter.increase(3);
    } else if (clicScore == 0) {
        scoreCounter.increase(2);
    } else {
        scoreCounter.increase(1);
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
    switchColor("france");
    switchColor("belgique");
    switchColor("hollande");
    switchColor("allemagne");
    switchColor("pologne");
    switchColor("tcheque");
    $("#joker").click(function () {
        joker()
    });


    const save = JSON.parse(localStorage.getItem("save"));
    if (save == null || save.level == 0) {} else {
        scoreCounter.increase(save.score);
        clicCounter.increase(save.clicNumber);
        levelCounter.increase(save.level);
    }
    updateLevel();
    updateClic();
    updateScore();
}

function saveData() {
    const save = {
        level: levelCounter.getValue(),
        "score": scoreCounter.getValue(),
        "clicNumber": clicCounter.getValue()
    };
    localStorage.setItem("save", JSON.stringify(save));
    return false;
}

function joker() {
    if (scoreCounter.getValue() > 0) {
        scoreCounter.decrease(1);
        updateScore();
    }
    var numberOfDiv = $("#" + allFlag[levelCounter.getValue()].getCountry()).children().last().children().length;
    if (numberOfDiv == 4) {
        numberOfDiv = 3;
    }
    var randomNthChild = Math.floor(Math.random() * numberOfDiv) + 1;
}