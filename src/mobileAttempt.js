import Phaser from "phaser";
import pigMailboxSpriteSheet from "./assets/PigMailbox1.png";
import cloudImg from "./assets/cloud.png";

const config = {
	type: Phaser.AUTO,
	parent: "root",
	mode: Phaser.Scale.FIT,
	width: 640,
	height: 640,
	pixelArt: true,
	backgroundColor: "ffe07e",
	scene: {
		preload: preload,
		create: create,
	},
};

const game = new Phaser.Game(config);

function preload() {
	this.load.spritesheet("PigMailbox", pigMailboxSpriteSheet, {
		frameWidth: 64,
		frameHeight: 64,
	});

	this.load.image("cloud", cloudImg);
}

function create() {
	// make animation configs
	const popOpenConfig = {
		key: "popOpenAnimation",
		frames: this.anims.generateFrameNumbers("PigMailbox", {
			start: 0,
			end: 12,
		}),
		frameRate: 7,
		repeat: 0,
	};

	const grumpyConfig = {
		key: "grumpyAnimation",
		frames: this.anims.generateFrameNumbers("PigMailbox", {
			start: 12,
			end: 14,
		}),
		frameRate: 1.5,
	};

	const putBackInConfig = {
		key: "putInAnimation",
		frames: this.anims.generateFrameNumbers("PigMailbox", {
			start: 15,
			end: 18,
		}),
		frameRate: 10,
		repeat: 0,
	};

	this.anims.create(popOpenConfig);
	this.anims.create(grumpyConfig);
	this.anims.create(putBackInConfig);

	// bool for state of pig
	let pigIn = true;

	const spriteScale = 10;
	const scaleRatio = window.devicePixelRatio / 3;
	//cloud tween
	const cloud = this.add.image(-100, 50, "cloud").setScale(spriteScale - 2);
	const cloudTween = this.tweens.add({
		targets: cloud,
		x: game.canvas.width + 200,
		duration: 20000,
		ease: "linear",
		loop: true,
	});
	// pigMailbox Sprite
	const pigMailbox = this.add
		.sprite(game.canvas.width / 2, game.canvas.height / 2, "PigMailbox")
		.setScale(spriteScale);

	// Make text
	this.pigWords = this.make.text({
		x: game.canvas.width / 2,
		y: game.canvas.height / 10,
		text: "Please put me back in",
		origin: 0.5,
		style: {
			font: "bold 30px Arial",
			fill: "white",
		},
	});
	this.pigWords.setVisible(false);

	// Input handler
	this.input.on(
		"pointerdown",
		function () {
			pigIn ? popOutAction() : putInAction();
			pigIn = !pigIn;
		},
		this
	);

	const popOutAction = () => {
		pigMailbox.play("popOpenAnimation");
		pigMailbox.anims.chain("grumpyAnimation");

		// set up custom animation event completed handler
		pigMailbox.on(
			"animationcomplete",
			function (anim, frame) {
				this.emit("animationcomplete_" + anim.key, anim, frame);
			},
			pigMailbox
		);

		pigMailbox.on("animationcomplete_grumpyAnimation", () => {
			pigIn ? null : this.pigWords.setVisible(true);
		});
	};

	const putInAction = () => {
		pigMailbox.play("putInAnimation");
		this.pigWords.setVisible(false);
	};
}
// function resizeApp() {
// 	// Width-height-ratio of game resolution
// 	// Replace 360 with your game width, and replace 640 with your game height
// 	let game_ratio = window.innerWidth / window.innerHeight;

// 	// Make div full height of browser and keep the ratio of game resolution
// 	let div = document.getElementById("root");
// 	div.style.width = window.innerHeight * game_ratio + "px";
// 	div.style.height = window.innerHeight + "px";

// 	// Check if device DPI messes up the width-height-ratio
// 	let canvas = document.getElementsByTagName("canvas")[0];

// 	let dpi_w = parseInt(div.style.width) / canvas.width;
// 	let dpi_h = parseInt(div.style.height) / canvas.height;

// 	let height = window.innerHeight * (dpi_w / dpi_h);
// 	let width = height * game_ratio;

// 	// Scale canvas
// 	canvas.style.width = width + "px";
// 	canvas.style.height = height + "px";
// }

// window.addEventListener("resize", resizeApp);
