var allFlagId = ["france", "belgique", "allemagne", "hollande", "pologne", "tcheque"];

var actualFlagId = allFlagId[0];
var flagIndex = 0;

var bonneSolution = false;

$(document).ready(function () {
    nextFlag(flagIndex);
    initialColor("france", "blue");
    initialColor("belgique", "yellow");
    initialColor("allemagne", "red");
    initialColor("hollande", "white");
    initialColor("pologne", "red");
    initialColor("tcheque", "red");
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
})

function initialColor(flagDiv, color) {
    $("#" + flagDiv).children().filter("div").children().each(function () {
        $(this).addClass(color);
    });
}

function switchColor(flagDiv, color1, color2, color3) {
    $("#" + flagDiv).children().filter("div").children().click(function () {
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
    console.log(reponse)
    if (soluce == reponse) {
        alert("FUCK YEAH");
        flagIndex++;
        nextFlag(flagIndex);
    } else {
        alert("L like a LOSER")
    }
}