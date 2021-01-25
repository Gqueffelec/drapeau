// class counter, with closure object and private method

var counter = function () {
    var count = 0;

    function addPoints(value) {
        count += value;
    };
    return {
        increase: function (value) {
            addPoints(value);
        },
        decrease: function (value) {
            addPoints(-value);
        },
        getValue: function () {
            return count;
        }
    }
}

// different counter base on the model
var scoreCounter = counter();
var clicCounter = counter();
var levelCounter = counter();
var clicPerFlagCounter = counter();
var jokerCounterUse = counter();