// flag class, for création of each flag in the game, just add a line with the options and to the array

var count;
var flag = function (pCountry, pOptimalClics, pNumberOfColor, color1, color2, color3, pDirection) {
    var country = pCountry;
    var optimalClics = pOptimalClics;
    var colors = new Array(pNumberOfColor);
    colors[0] = color1;
    colors[1] = color2;
    var direction = pDirection;
    if (pNumberOfColor >= 3) {
        colors[2] = color3;
    }
    var id = count++;
    return {
        getCountry: function () {
            return country;
        },
        getColor: function (value) {
            return colors[value];
        },
        getId: function () {
            return id;
        },
        getColors: function () {
            return colors;
        },
        getOptmimalClics: function () {
            return optimalClics;
        },
        getDirection: function () {
            return direction;
        }

    }
}
//creation of basic flag for the game, more can be add later

var flagFrance = flag("france", 12, 3, "blue", "white", "red", "row3");
var flagBelgique = flag("belgique", 8, 3, "black", "yellow", "red", "row3");
var flagAllemagne = flag("allemagne", 8, 3, "black", "red", "yellow", "column3");
var flagHollande = flag("hollande", 12, 3, "red", "white", "blue", "column3");
var flagPologne = flag("pologne", 8, 2, "white", "red", null, "row2");
var flagTcheque = flag("tcheque", 12, 4, "white", "red", "blue", "row2triangle");

// array of all flag
var allFlag = [flagFrance, flagBelgique, flagAllemagne, flagHollande, flagPologne, flagTcheque];
// create a new flag, with the div etc..
function createFlag(flag) {
    var flagDiv = $(".drapeau");
    var numberOfDiv;
    flagDiv.attr("id", flag.getDirection());
    flagDiv.append("<h1>" + flag.getCountry().charAt(0).toUpperCase() + flag.getCountry().slice(1) + "</h1>");
    numberOfDiv = flag.getColors().length;
    flagDiv.append("<div>");
    for (let i = 0; i < numberOfDiv; i++) {
        flagDiv.children().last().append("<div></div>");
    }
    flagDiv.children().filter("div").children().each(function () {
        $(this).addClass("green");
    });
    if (flag.getDirection().indexOf("triangle") >= 0) {
        flagDiv.children().filter("div").children().eq(2).attr('id', 'triangle');
    }
    switchColor(flag.getDirection());
}