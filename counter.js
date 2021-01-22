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
var scoreCounter = counter();
var clicCounter = counter();
var levelCounter = counter();
var clicPerFlagCounter = counter();