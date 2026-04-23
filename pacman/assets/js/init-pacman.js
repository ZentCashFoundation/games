// Inicializar Pacman Game
var el = document.getElementById("pacman");

if (Modernizr.canvas && Modernizr.localstorage && 
	Modernizr.audio && (Modernizr.audio.ogg || Modernizr.audio.mp3)) {
	window.setTimeout(function () { PACMAN.init(el, "./"); }, 0);
}
