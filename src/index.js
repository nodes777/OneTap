import Phaser from "phaser";
import pigMailboxSpriteSheet from "./assets/PigMailbox1.png";
import cloudImg from "./assets/cloud.png";
// import vcrFont from "./assets/VCR.ttf";

import { init } from "./scenes/init";
import { preload } from "./scenes/preload";
import { create } from "./scenes/create";

const config = {
	type: Phaser.AUTO,
	parent: "root",
	mode: Phaser.Scale.FIT,
	width: window.innerWidth,
	height: window.innerHeight,
	pixelArt: true,
	backgroundColor: "ffe07e",
	scene: {
		init: init,
		preload: preload,
		create: create,
	},
};

const game = new Phaser.Game(config);
