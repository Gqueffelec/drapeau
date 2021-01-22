var start = 0;
var end = 0;
var diff = 0;
var timer = 0;
var time;

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