import Phaser from "phaser";
import logoImg from "./assets/logo.png";

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 600,
	height: 600,
	pixelArt: true,
	backgroundColor: "ffe07e",
	scene: {
		preload: preload,
		create: create,
	},
};

const game = new Phaser.Game(config);

function preload() {
	this.load.spritesheet("PigMailbox", "src/assets/PigMailbox1.png", {
		frameWidth: 64,
		frameHeight: 64,
	});
}

function create() {
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

	// pigMailbox Sprite
	const pigMailbox = this.add
		.sprite(game.canvas.width / 2, game.canvas.height / 2, "PigMailbox")
		.setScale(9);

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
