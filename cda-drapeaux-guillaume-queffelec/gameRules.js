// Intro text, more can be added

const texts = ["Bienvenue sur Question pour un Drapeau !",
    "Le but du jeu ici va être de compléter les drapeaux dont le pays s'affiche au dessus.",
    "Pour cela il suffit de cliquer sur la case d'une couleur et celle va changer pour la suivante.",
    "Le score du jeu est indiqué en haut, il y a le niveau auquel vous êtes, le timer ainsi que le nombre de clic!",
    "Le jeu démarre dès que vous cliquez sur le bouton 'Commencer'",
    "Le joker coute un point et vous donne une bonne couleur!",
    "Le bouton Abandonner vous permet de passer au drapeau suivant, aucuns points ne sont crédité"
];

// option and data in Object

const options = {
    // Time to show a char
    timeout: 2,
    // Number of random characters to show before the right one
    iterations: 10,
    // Random characters list
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
};
var i = 0;
var textToAppend = "";
var actualIterations = 0;
var j = 0;
var introMusique = new Audio("introMusique.mp3");
$(function () {
    $("#next").click(function () {
        $('#skipIntroduction').remove();
        $(this).hide();
        randomLetter();
        if (i == 0) {
            introMusique.play();
        }
    })
    $('#skipIntroduction').click(function () {
        skip();
    })
})
// generate random letter object.iterions times (10 default) then append the right one, at the end of each sentence pop a next button or start when the rules are totally displayed
function randomLetter() {
    var max = texts[i].length;
    var maxRandom = options.characters.length;
    if (actualIterations != options.iterations) {
        actualIterations++;
        $("#texte").html(textToAppend + options.characters[Math.floor(Math.random() * Math.floor(maxRandom))]);
        setTimeout(randomLetter, options.timeout)
    } else {
        textToAppend += texts[i].charAt(j);
        j++;
        $("#texte").html(textToAppend);
        actualIterations = 0;
        if (j != max) {
            setTimeout(randomLetter, options.timeout)
        } else {
            i++;
            j = 0;
            textToAppend += "<br>"
            $("#next").show();
            if (i == texts.length) {
                $("#next").html("C'est parti !").off('click').attr("id", "start");
                $("#start").click(function () {
                    $("#introduction").remove();
                    nextFlag(levelCounter.getValue());
                    start = new Date();
                    $("body").removeClass("popup");
                    $("#scoreBoard").show();
                    $("#time").show();
                    $("#joker").show();
                    $('#skip').show();
                    introMusique.pause();
                    music.play();
                    inGame = true;
                })
            }
        }
    }
}
// skip button to display full text rules without animation and start quicker 
function skip() {
    var fullText = "";
    for (let i = 0; i < texts.length; i++) {
        fullText += texts[i] + "<br>";
    }
    $("#texte").html(fullText);
    $("#next").html("C'est parti !").off('click').attr("id", "start");
    $("#skipIntroduction").remove();
    $("#start").click(function () {
        $("#introduction").remove();
        nextFlag(levelCounter.getValue());
        start = new Date();
        $("body").removeClass("popup");
        $("#scoreBoard").show();
        $("#time").show();
        $("#joker").fadeIn();
        $('#skip').fadeIn();
        music.play();
        inGame = true;
    })
}