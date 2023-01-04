const WIDTH = 400;
const HEIGHT = 400;

const angles = [];
const sequence = [
	0,
	Math.PI / 4,
	Math.PI / 8,
	3 * Math.PI /8,
	Math.PI / 16,
	5 * Math.PI / 16,
	3 * Math.PI / 16,
	7 * Math.PI / 16,
	Math.PI / 32,
	9 * Math.PI / 32,
	3 * Math.PI / 32,
	11 * Math.PI / 32,
	5 * Math.PI / 32,
	13 * Math.PI / 32,
	7 * Math.PI / 32,
	15 * Math.PI / 32,
	Math.PI / 64,
	17 * Math.PI / 64,
	3 * Math.PI / 64,
	19 * Math.PI / 64,
	5 * Math.PI / 64,
	21 * Math.PI / 64,
	7 * Math.PI / 64,
	23 * Math.PI / 64,
	9 * Math.PI / 64,
	25 * Math.PI / 64,
	11 * Math.PI / 64,
	27 * Math.PI / 64,
	13 * Math.PI / 64,
	29 * Math.PI / 64,
	15 * Math.PI / 64,
	31 * Math.PI / 64,
];

function setup() {
	createCanvas(WIDTH, HEIGHT);
	background(0);
}

function draw() {
	if (frameCount % 30 === 0) {
		if (frameCount / 30 - 1 >= sequence.length) {
			return;
		}
		angles.push(sequence[frameCount / 30 - 1])
	}
	if (frameCount % 30 === 1) {
		noStroke();
		loadPixels();
		const d = pixelDensity();
		for (let i = 0; i < d; i++) {
			for (let j = 0; j < d; j++) {
				for (let x = 0; x < WIDTH; x++) {
					for (let y = 0; y < HEIGHT; y++) {
						let color = 255;
						for (let angle of angles) {
							if (
								Math.abs((x - WIDTH/2) * Math.cos(angle) + (y - HEIGHT/2) * Math.sin(angle)) > Math.sqrt(2)*WIDTH/4 ||
								Math.abs((y - HEIGHT/2) * Math.cos(angle) - (x - WIDTH/2) * Math.sin(angle)) > Math.sqrt(2)*HEIGHT/4) {
								color /= 1.17;
							}
						}
						const index = 4 * ((y * d + j) * WIDTH * d + (x * d + i));

						pixels[index] = color;
						pixels[index+1] = color;
						pixels[index+2] = color;
						pixels[index+3] = color;
					}
				}
			}
		}
		updatePixels();
	}
}