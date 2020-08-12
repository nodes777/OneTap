import Phaser from "phaser";

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

export const game = new Phaser.Game(config);
