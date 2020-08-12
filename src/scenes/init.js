export function init() {
	//  Inject CSS to get font
	var element = document.createElement("style");

	document.head.appendChild(element);

	var sheet = element.sheet;

	var styles =
		'@font-face { font-family: "vcr"; src: url("src/assets/vcr.ttf") format("truetype"); }\n';

	sheet.insertRule(styles, 0);
}
