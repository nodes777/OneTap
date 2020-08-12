import pigMailboxSpriteSheet from "../assets/PigMailbox1.png";
import cloudImg from "../assets/cloud.png";

// import vcrFont from "./assets/VCR.ttf";

export function preload() {
	this.load.script(
		"webfont",
		"https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
	);

	this.load.spritesheet("PigMailbox", pigMailboxSpriteSheet, {
		frameWidth: 64,
		frameHeight: 64,
	});

	this.load.image("cloud", cloudImg);
}
