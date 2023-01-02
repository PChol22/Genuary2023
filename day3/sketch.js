let WIDTH = 400;
let HEIGHT = 400;

let img;
let fr = 1;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	const form = document.createElement("div");
	form.style.position = 'absolute';
	form.style.bottom = "1em";
	form.style.display = "flex";
	form.style.gap = ".5em";

	const inputX = document.createElement("input");
	inputX.placeholder = 'Cat width';
	form.appendChild(inputX);

	const inputY = document.createElement("input");
	inputY.placeholder = 'Cat height';
	form.appendChild(inputY);

	const submit = document.createElement("button");
	submit.innerHTML = "GO 😈";
	submit.addEventListener('click', () => {
		if (!isNaN(inputX.value) && !isNaN(inputY.value) && inputX.value > 100 && inputY.value > 100) {
			WIDTH = inputX.value;
			HEIGHT = inputY.value;
			frameCount = 0;
			setup();
		}
	});
	form.appendChild(submit);

	document.body.appendChild(form);
}

function draw() {
	if (frameCount === 1) {
		img = new Image();
		img.src = `http://placekitten.com/${WIDTH}/${HEIGHT}`;
		img.crossOrigin = "Anonymous";

		img.onload = () => drawingContext.drawImage(img,0,0);
	}

	loadPixels();

	for (let k = 0; k < 4; k++) {
		const w = Math.floor((Math.random() * 50) + 2) * 2;
		const h = Math.floor((Math.random() * 50) + 2) * 2;
		const topLeftX = Math.floor(Math.random() * (WIDTH - w));
		const topLeftY = Math.floor(Math.random() * (HEIGHT - h));
		
		const d = pixelDensity();
		const horizontalFlip = Math.random() < 0.5;
		for (let x = 0; x < w / 2; x++) {
			for (let y = 0; y < h / 2; y++) {
				for (let i = 0; i < d; i++) {
					for (let j = 0; j < d; j++) {
						const index = 4 * (((y + topLeftY) * d + j) * WIDTH * d + ((x + topLeftX) * d + i));
						
						let index2;
						if (horizontalFlip) {
							index2 = 4 * (((y + topLeftY) * d + j) * WIDTH * d + ((topLeftX + w - x) * d + i));
						} else {
							index2 = 4 * (((topLeftY + h - y) * d + j) * WIDTH * d + ((x + topLeftX) * d + i));
						}
						
						let c1 = pixels[index];
						let c2 = pixels[index + 1];
						let c3 = pixels[index + 2];
						let c4 = pixels[index + 3];

						pixels[index] = pixels[index2];
						pixels[index + 1] = pixels[index2 + 1];
						pixels[index + 2] = pixels[index2 + 2];
						pixels[index + 3] = pixels[index2 + 3];

						pixels[index2] = c1;
						pixels[index2 + 1] = c2;
						pixels[index2 + 2] = c3;
						pixels[index2 + 3] = c4;
					}
				}
			}
		}
	}

	updatePixels();

	if (frameCount % (4 * fr) === 1 && fr < 60) {
		fr++;
		frameRate(fr);	
	}
}
