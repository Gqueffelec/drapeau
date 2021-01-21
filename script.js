$(document).ready(function () {
    // $(".drapeau").hide();
    $("#france").show();
    initialColor("france", "blue");
    initialColor("belgique", "yellow");
    initialColor("allemagne", "red");
    initialColor("hollande", "white");
    initialColor("pologne", "red");
    initialColor("tchequie", "red");
});
$(function () {
    switchColor("france", "blue", "red", "white");
    switchColor("belgique", "black", "red", "yellow");
    switchColor("hollande", "blue", "red", "white");
    switchColor("allemagne", "black", "red", "yellow");
    switchColor("pologne", "white", "red", null);
    switchColor("tchequie", "white", "red", "blue");
})

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

function initialColor(flagDiv, color) {
    $("#" + flagDiv).children().filter("div").children().each(function () {
        $(this).addClass(color);
    });
}