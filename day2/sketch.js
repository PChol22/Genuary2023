// Made in 9 minutes 57 seconds

const WIDTH = 400;
const HEIGHT = 400;

const LINES = 10;

let t = 0;

function setup() {
	createCanvas(WIDTH, HEIGHT);
}

function draw() {
	background('#171D1C12');
	noFill();
	stroke('#F1E9DA');

	for (let i = 0; i < LINES; i++) {
		beginShape();
		for (let y = 0; y <= HEIGHT; y++) {
				const uncertainty = (noise(i, y / 40 + t, t/3) - 0.5) * 1.5 * WIDTH / LINES;
				vertex((i + 0.5) * WIDTH / LINES + uncertainty, y);
		}
		endShape();
	}

	t += 0.01;
}
