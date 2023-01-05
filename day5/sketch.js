const WIDTH = 400;
const HEIGHT = 400;

const GRID_SIZE = 30;
const TEXT_SIZE = HEIGHT / GRID_SIZE;

const grid = [];

const drops = [];
const NB_OF_DROPS = 40;

let inconsolata;

function preload() {
	inconsolata = loadFont('../assets/Inconsolata-SemiBold.ttf');
}

function setup() {
	createCanvas(WIDTH, HEIGHT);
	for (let i = 0; i < GRID_SIZE; i++) {
		grid.push([])
		for (let j = 0; j < GRID_SIZE; j++) {
			grid[i].push(Math.floor(Math.random() * 10));
		}
	}

	for (let i = 0; i < NB_OF_DROPS; i++) {
		drops.push({ x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT) });
	}
}

function draw() {
	push();
	background(0);
	textSize(TEXT_SIZE);
	translate(0, TEXT_SIZE);
	textFont(inconsolata ?? 'Helvetica');
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			fill(0, 30, 0);
			const drop = drops.find(({ x, y }) => Math.floor(x / TEXT_SIZE) === j && Math.floor(y / TEXT_SIZE) > i)
			if (drop!== undefined) {
				fill(0, 30 + 225 / (1 + Math.floor(drop.y / TEXT_SIZE) - i), 0);
			}
			text(grid[i][j], j * WIDTH / GRID_SIZE, i * WIDTH / GRID_SIZE);
		}
	}
	pop();

	for (let i = 0; i < NB_OF_DROPS; i++) {
		drops[i].y += 0.5 + (drops[i].y / 100);
		drops[i].y %= 400;
	}

	if (frameCount % 10 === 0) {
		for (let i = 0; i < GRID_SIZE; i++) {
			for (let j = 0; j < GRID_SIZE; j++) {
				grid[i][j] = Math.floor(Math.random() * 10);
			}
		}
	}
}
