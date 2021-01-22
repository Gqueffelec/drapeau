var allFlagId = ["france", "belgique", "allemagne", "hollande", "pologne", "tcheque"];
var actualFlagId = allFlagId[0];
var flagIndex = 0;
var numberOfClic = 0;
var start = 0;
var end = 0;
var diff = 0;
var timer = 0;

$(document).ready(function () {
    nextFlag(flagIndex);
    initialColor("france", "blue");
    initialColor("belgique", "yellow");
    initialColor("allemagne", "red");
    initialColor("hollande", "white");
    initialColor("pologne", "red");
    initialColor("tcheque", "red");
    updateScore();
    start = new Date();
    chrono();
    updateClic();
    $('#valider').hide();
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
        let soluce;
        switch (flagIndex) {
            case 0:
                soluce = "bluewhitered";
                checkSolution(soluce);
                updateScore();
                break;
            case 1:
                soluce = "blackyellowred";
                checkSolution(soluce);
                updateScore();
                break;
            case 2:
                soluce = "blackredyellow";
                checkSolution(soluce);
                updateScore();
                break;
            case 3:
                soluce = "redwhiteblue";
                checkSolution(soluce);
                updateScore();
                break;
            case 4:
                soluce = "whitered";
                checkSolution(soluce);
                updateScore();
                break;
            case 5:
                soluce = "whiteredbluered";
                checkSolution(soluce);
                updateScore();
                break;
            default:
                break;
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
                checkSolution(soluce);
                break;
            case 1:
                soluce = "blackyellowred";
                checkSolution(soluce);
                break;
            case 2:
                soluce = "blackredyellow";
                checkSolution(soluce);
                break;
            case 3:
                soluce = "redwhiteblue";
                checkSolution(soluce);
                break;
            case 4:
                soluce = "whitered";
                checkSolution(soluce);
                break;
            case 5:
                soluce = "whiteredbluered";
                checkSolution(soluce);
                break;
            default:
                break;
        }
    })
}

function nextFlag(index) {
    $(".drapeau").hide();
    $("#" + allFlagId[index]).show();

}

function checkSolution(soluce) {
    let reponse = "";
    $("#" + allFlagId[flagIndex]).children().last().children().each(function () {
        reponse += $(this).attr('class');
    })
    if (soluce == reponse) {
        $("#valider").show();
    }
}

function updateScore() {
    $('#level').html("Niveau " + flagIndex + "/6 !");
}

function updateClic() {
    $('#clic').html("Nombre de clics : " + numberOfClic);
}

function chrono() {
    end = new Date();
    diff = end - start;
    diff = new Date(diff);
    var sec = diff.getSeconds();
    var min = diff.getMinutes();
    var hr = diff.getHours() - 1;
    $('#time').html(addZero(hr) + ":" + addZero(min) + ":" + addZero(sec));
    timer = setTimeout("chrono()", 1000);
}

function addZero(nombre) {
    if (nombre < 10) {
        return "0" + nombre;
    } else {
        return nombre;
    }
}