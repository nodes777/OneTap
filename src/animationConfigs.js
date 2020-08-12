// make animation configs
export const popOpenConfig = {
	key: "popOpenAnimation",
	frames: this.anims.generateFrameNumbers("PigMailbox", {
		start: 0,
		end: 12,
	}),
	frameRate: 7,
	repeat: 0,
};

export const grumpyConfig = {
	key: "grumpyAnimation",
	frames: this.anims.generateFrameNumbers("PigMailbox", {
		start: 12,
		end: 14,
	}),
	frameRate: 1.5,
};

export const putBackInConfig = {
	key: "putInAnimation",
	frames: this.anims.generateFrameNumbers("PigMailbox", {
		start: 15,
		end: 18,
	}),
	frameRate: 10,
	repeat: 0,
};
