export function create() {
	// WebFont.load({
	// 	custom: {
	// 		families: ["vcr"],
	// 	},
	// });

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
	const cloud = this.add
		.image(-100, game.canvas.height / 10, "cloud")
		.setScale(spriteScale - 2);
	const cloudTween = this.tweens.add({
		targets: cloud,
		x: game.canvas.width + 200,
		duration: 20000,
		ease: "linear",
		loop: 100,
	});

	// rect for ground to extend through game canvas
	const rect = this.add.rectangle(
		game.canvas.width / 2,
		game.canvas.height,
		game.canvas.width,
		22 * spriteScale,
		0x72dcbb,
		1
	);

	// pigMailbox Sprite
	const pigMailbox = this.add
		.sprite(game.canvas.width / 2, game.canvas.height, "PigMailbox")
		.setOrigin(0.5, 1)
		.setScale(spriteScale);

	// Make text
	this.pigWords = this.make.text({
		x: game.canvas.width / 2,
		y: game.canvas.height / 2,
		text: "Please put me back in",
		origin: 0.5,
		style: {
			font: "bold 64px vcr",
			fill: "white",
		},
	});
	// .setShadow(2, 2, "#333333", 2, false, true);

	console.log(this.pigWords.width);
	console.log(this.pigWords.height);

	this.pigWords.setVisible(false);
	this.pigWords.setDepth(1);
	// this.textRect = this.add.rectangle(
	// 	game.canvas.width / 2,
	// 	game.canvas.height / 2,
	// 	this.pigWords.width + 40,
	// 	this.pigWords.height + 40,
	// 	0x72dcbb,
	// 	1
	// );
	// this.textRect.setDepth(0);
	// this.textRect.setVisible(false);

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
			pigIn
				? null
				: (() => {
						this.pigWords.setVisible(true);
						// this.textRect.setVisible(true);
				  })();
		});
	};

	const putInAction = () => {
		pigMailbox.play("putInAnimation");
		this.pigWords.setVisible(false);
		// this.textRect.setVisible(false);
	};
}
