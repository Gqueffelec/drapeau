var count;
var flag = function (pCountry, pOptimalClics, pNumberOfColor, color1, color2, color3) {
    var country = pCountry;
    var optimalClics = pOptimalClics;
    var colors = new Array(pNumberOfColor);
    colors[0] = color1;
    colors[1] = color2;
    if (pNumberOfColor == 3) {
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
        }

    }
}
var flagFrance = flag("france", 7, 3, "blue", "white", "red");
var flagBelgique = flag("belgique", 6, 3, "black", "yellow", "red");
var flagAllemagne = flag("allemagne", 3, 3, "black", "red", "yellow");
var flagHollande = flag("hollande", 4, 3, "red", "white", "blue");
var flagPologne = flag("pologne", 3, 2, "white", "red");
var flagTcheque = flag("tcheque", 7, 3, "white", "red", "blue");
var allFlag = [flagFrance, flagBelgique, flagAllemagne, flagHollande, flagPologne, flagTcheque];