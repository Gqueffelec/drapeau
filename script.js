var intervalId;
var allColorSwitch = ["blue", "green", "red", "yellow", "black", "white"];
var endGame = false;
var switchColorEnable = true;
var actualFlagId = allFlag[levelCounter.getValue()].getCountry();
var saveOn = false;
var music = new Audio("mainMusique.mp3");
music.loop = true;
var inGame = false;
var pointsPerFlag = 0;
var stopChrono = false;

// function call on refesh or exit
window.onbeforeunload = function (event) {
    if (levelCounter.getValue() < allFlag.length) {
        saveData();
    }
}
// load only when the page is totally loaded
$(document).ready(function () {
    initialize();
    console.log(saveOn);
    if (saveOn == false) {
        popUp();
    } else {
        $("#endGame").hide();
        $("#introduction").remove();
        nextFlag(levelCounter.getValue());
        $("body").removeClass("popup");
        $("#scoreBoard").show();
        $("#time").show();
        $("#joker").show();
        $('#skip').show();
        inGame = true;
        //  music.play();
    }
})
// function to simulate starting and ending popUp
// hiding most of the componant and apply background effect on body to make it "shadowed"
function popUp() {
    $("body").addClass("popup");
    $('.drapeau').hide();
    $('#time').hide();
    $("#scoreBoard").hide();
    $('#valider').hide();
    $('#joker').hide();
    $('#skip').hide();
    if (!endGame) {
        $("#endGame").hide();
        if (inGame) {
            $("#points").show();
            animateScript();
            $("#points p").html("Bien joué ! <br> Vous avez réalisé : " + pointsPerFlag + " points avec " + clicPerFlagCounter.getValue() + " clics");
            clicPerFlagCounter.decrease(clicPerFlagCounter.getValue());
            $("#points button").click(function () {
                clearInterval(intervalId);
                nextFlag(levelCounter.getValue());
                $("#points").hide();
                $("body").removeClass("popup");
                $("#scoreBoard").show();
                $("#time").show();
                $("#joker").fadeIn();
                $('#skip').fadeIn();
            })
        }
    } else {
        music.pause();
        $("#points").show();
        animateScript();
        $("#points button").remove();
        $("#points p").html("Bien joué ! <br> Vous avez réalisé un total de : " + pointsPerFlag + " points avec " + clicPerFlagCounter.getValue() + " clics");
        localStorage.clear();
    }
}
// initialisation of the game, starting color, clickable div, joker activation, import save
function initialize() {
    $("#points").hide();
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

    // parse du JSON to recover saved data 
    const save = JSON.parse(localStorage.getItem("save"));
    if (save == null) {

    } else {
        scoreCounter.increase(save.score);
        clicCounter.increase(save.clicNumber);
        levelCounter.increase(save.level);
        start = new Date() - new Date(save.time);
        saveOn = true;
        music.play();
    }
    updateLevel();
    updateClic();
    updateScore();
    validateButton();
    giveUp();
}
// add click function on the validate Button
function validateButton() {
    $("#valider").hide().click(function () {
        var optimalClic = allFlag[levelCounter.getValue()].getOptmimalClics();
        calculPoints(optimalClic, clicPerFlagCounter.getValue());
        $('#joker button').prop("disabled", false);
        levelCounter.increase(1)
        updateScore()
        $(this).hide();
        switchColorEnable = true;
        // if it was the last flag, validate the game and display the final score
        if (levelCounter.getValue() == 6) {
            endGame = true;
            popUp();
            $("#points p").html("Bien joué ! <br> Vous avez réalisé un total de : " + scoreCounter.getValue() + " points avec " + clicCounter.getValue() + " clics")
        } else {
            popUp();

        }
    })
}
// set div initial color at start
function initialColor(flagDiv, color) {
    $("#" + flagDiv).children().filter("div").children().each(function () {
        $(this).addClass(color);
    });
}
// enable clic to switch the color on the color's list and check if the displayed color are valid for the solution
function switchColor(flagDiv) {
    $("#" + flagDiv).children().filter("div").children().click(function () {
        if (switchColorEnable && !$(this).hasClass("joker")) {
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
        saveData();
    })
}
// check if the color actually displayed are the same than the one in the flag data
function checkSolution() {
    var soluce = allFlag[levelCounter.getValue()].getColors();
    var reponse = new Array(soluce.length);
    $("#" + allFlag[levelCounter.getValue()].getCountry()).children().last().children().each(function (i) {
        reponse[i] = "" + $(this).attr('class').replace("joker ", "");
    })
    // case for czech republic with one fake div 
    if (levelCounter.getValue() == 5) {
        reponse.pop();
    }
    if (JSON.stringify(soluce) === JSON.stringify(reponse)) {
        clearTimeout(timer);
        timer = null;
        stopChrono = true;
        $("#valider").fadeIn();
        $("#skip").fadeOut();
        $("#joker").fadeOut();
        // can't switch color once everything is good 
        switchColorEnable = false;
        $('#joker button').prop("disabled", true);
    }
}
// switch the game to the next flag and start new chrono
function nextFlag(index) {
    if (index != 6) {
        $(".drapeau").hide();
        $("#" + allFlag[index].getCountry()).show();
        updateLevel();
        if (!saveOn) {
            start = new Date();
        }
        saveOn = false;
        stopChrono = false;
        chrono();
    } else {
        $('#time').hide();
    }
}
// calcul of the points winning when correct answer is guessed, based on data of the flag
function calculPoints(optimalClicNumber, actualClicNumber) {
    let clicScore = actualClicNumber - optimalClicNumber;
    var score = 0
    if (clicScore < 0 && diff.getSeconds() <= optimalClicNumber - 2) {
        score = 3 - jokerCounterUse.getValue();
    } else if (clicScore == 0) {
        score = 2 - jokerCounterUse.getValue();
    } else {
        score = 1 - jokerCounterUse.getValue();
    }
    if (score < 0) {
        score = 0;
    }
    scoreCounter.increase(score);
    pointsPerFlag = score;
    jokerCounterUse.decrease(jokerCounterUse.getValue());
    updateScore();
}
// update displayed level to the actual one
function updateLevel() {
    $('#level').html("Niveau " + (levelCounter.getValue() + 1) + "/6 !");
}
// update number of clicks displayed
function updateClic() {
    $('#clic').html("Nombre de clics : " + clicCounter.getValue());
}
// update score displayed 
function updateScore() {
    $('#score').html("Score : " + scoreCounter.getValue());
    if (scoreCounter.getValue() == 0) {
        $('#joker button').prop("disabled", true);
    } else {
        $('#joker button').prop("disabled", false);
    }
}
// save data into JSON for easy manipulation
function saveData() {
    const save = {
        "level": levelCounter.getValue(),
        "score": scoreCounter.getValue(),
        "clicNumber": clicCounter.getValue(),
        "time": diff
    };
    localStorage.setItem("save", JSON.stringify(save));
    return false;
}
// joker button function, activate only if the div isn't a joker already and not everything is guessed, lock the div on which the joker was use
function joker() {
    jokerCounterUse.increase(1);
    var actualFlag = $("#" + allFlag[levelCounter.getValue()].getCountry())
    var numberOfDiv = actualFlag.children().last().children().length;
    if (numberOfDiv == 4) {
        numberOfDiv = 3;
    }
    var randomNumber = new Array();
    for (let i = 0; i < numberOfDiv; i++) {
        randomNumber[i] = i;
    }
    var randomNthChild = randomNumber.splice(Math.floor(Math.random() * randomNumber.length), 1);
    var divToLock = actualFlag.children().last().children().eq(randomNthChild);
    while (divToLock.attr("class").indexOf("joker") >= 0) {
        randomNthChild = randomNumber.splice(Math.floor(Math.random() * randomNumber.length), 1);
        divToLock = actualFlag.children().last().children().eq(randomNthChild);
    }
    scoreCounter.decrease(1);
    updateScore();
    divToLock.removeClass().addClass("joker").addClass(allFlag[levelCounter.getValue()].getColor(randomNthChild));
    checkSolution();
}
// give up button with no points
function giveUp() {
    $("#skip button").click(function () {
        levelCounter.increase(1);
        nextFlag(levelCounter.getValue());
        if (levelCounter.getValue() == 6) {
            endGame = true;
            popUp();
            $("#endGame").html("Bien joué ! <br> Vous avez réalisé : " + scoreCounter.getValue() + " points avec " + clicCounter.getValue() + " clics")
        }
    })
}

// animation script for the firework effect, import the sprite and show part of the image one by one on a short interval
function animateScript() {
    var positionX = 192;
    var positionY = 0;
    var interval = 50;
    intervalId = setInterval(function () {
        document.getElementById("image").style.backgroundPosition =
            `-${positionX}px -${positionY}px`;
        if (positionX < 768) {
            positionX += 192
        } else if (positionY < 1344) {
            positionX = 192;
            positionY += 192;
        } else {
            positionX = 192;
            positionY = 0;
        }
    }, interval)
}