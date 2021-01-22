// Intro text

const texts = ["Bienvenue sur Question pour un Drapeau !",
    "Le but du jeu ici va être de compléter les drapeaux dont le pays s'affiche au dessus.",
    "Pour cela il suffit de cliquer sur la case d'une couleur et celle va changer pour la suivante.",
    "Le score du jeu est indiqué en haut, il y a le niveau auquel vous êtes, le timer ainsi que le nombre de clic!",
    "Le jeu démarre dès que vous cliquez sur le bouton 'Commencer'",
    "Le joker coute un point et vous donne une bonne couleur!"
];

// option and data in Object

const options = {
    // Time to show a char
    timeout: 5,
    // Number of random characters to show before the right one
    iterations: 10,
    // Random characters list
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
};