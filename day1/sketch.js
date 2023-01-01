const arr = [];

const WIDTH = 400;
const HEIGHT = 400;
const SPACING = 40;

const CIRCLE_SIZE_1 = 8;
const CIRCLE_SIZE_2 = 16;

const PERIOD = Math.log(7 + 4 * Math.sqrt(3));
let t = 0;

function setup() {
	createCanvas(WIDTH,HEIGHT);
	for (let i = -4*WIDTH / SPACING; i < 4*WIDTH / SPACING; i++) {
		arr.push([]);
		for (let j = -4*HEIGHT / SPACING; j < 4*HEIGHT / SPACING; j++) {
			arr[arr.length - 1].push({x: (i + Math.sqrt(3)/2 * j) * SPACING, y: (i - Math.sqrt(3)/2 * j) * SPACING});
		} 
	}
}



function draw() {
	background('#F6F7EB');
	noStroke();
	const expT = Math.exp(t);
	const expT2 = Math.exp(-t);

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			fill('#3D5467');
			const x = arr[i][j].x * expT2 + WIDTH/2;
			const y = arr[i][j].y * expT + HEIGHT/2;
			if (x < -CIRCLE_SIZE_1 || x > WIDTH + CIRCLE_SIZE_1 || y < -CIRCLE_SIZE_1 || y > HEIGHT + CIRCLE_SIZE_1) continue;
			circle(x,y,CIRCLE_SIZE_1);
		} 
	}

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			fill('#C998C9');
			const x = arr[i][j].x * expT + WIDTH/2;
			const y = arr[i][j].y * expT2 + HEIGHT/2;
			if (x < -CIRCLE_SIZE_2 || x > WIDTH + CIRCLE_SIZE_2 || y < -CIRCLE_SIZE_2 || y > HEIGHT + CIRCLE_SIZE_2) continue;
			circle(x,y,CIRCLE_SIZE_2);
		} 
	}

	if(t < PERIOD) {
		t+= PERIOD / 200;
	}
	//else { t = 0; }
}
