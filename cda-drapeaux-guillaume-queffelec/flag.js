// flag class, for création of each flag in the game, just add a line with the options and to the array

var count;
var flag = function (pCountry, pNumberOfColor, color1, color2, color3, pDirection) {
    var country = pCountry;
    var optimalClics;
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
        },
        setOptimalClic: function (value) {
            optimalClics = value;
        }

    }
}
//creation of basic flag for the game, more can be add later

var flagFrance = flag("france", 3, "blue", "white", "red", "row3");
var flagBelgique = flag("belgique", 3, "black", "yellow", "red", "row3");
var flagAllemagne = flag("allemagne", 3, "black", "red", "yellow", "column3");
var flagHollande = flag("hollande", 3, "red", "white", "blue", "column3");
var flagPologne = flag("pologne", 2, "white", "red", null, "row2");
var flagTcheque = flag("tcheque", 4, "white", "red", "blue", "row2triangle");

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
    var colorAtual = new Array();
    flagDiv.children().filter("div").children().each(function () {
        $(this).addClass(allColorSwitch[Math.floor(Math.random() * 5)]);
        colorAtual.push($(this).attr("class"))
    });
    var colorSoluce = flag.getColors();
    var totalOptimalClic = 0;
    for (let i = 0; i < colorSoluce.length; i++) {
        var numberOfClicForOneColor = allColorSwitch.indexOf(colorSoluce[i]) - allColorSwitch.indexOf(colorAtual[i])
        if (numberOfClicForOneColor < 0) {
            numberOfClicForOneColor = allColorSwitch.length - allColorSwitch.indexOf(colorAtual[i]) + allColorSwitch.indexOf(colorSoluce[i])
        }
        totalOptimalClic += numberOfClicForOneColor;
    }
    flag.setOptimalClic(totalOptimalClic);
    if (flag.getDirection().indexOf("triangle") >= 0) {
        flagDiv.children().filter("div").children().eq(2).attr('id', 'triangle');
    }
    switchColor(flag.getDirection());
}