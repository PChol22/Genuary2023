let kmeans;
let baseImage;
const data = [];

const WIDTH = 400;
const HEIGHT = 400;
const imgSize = 30;

const k = 3;

const options = {
	k,
  maxIter: 4,
  threshold: 0.5,
};

const centroids = [];
const count = [];

function preload() {
  img = loadImage("madmax.png");
}

function setup() {
  createCanvas(WIDTH, HEIGHT);

	for (let i = 0; i < k; i++) {
		centroids.push({r:0,g:0,b:0});
		count.push(0);
	}

	img.loadPixels();
	img.resize(WIDTH, HEIGHT);
	image(img, 0, 0);
  filter(GRAY);

  img.resize(imgSize, imgSize);
  img.loadPixels();

  for (let x = 0; x < imgSize; x += 1) {
    for (let y = 0; y < imgSize; y += 1) {
      const off = (y * imgSize + x) * 4;
      const r = img.pixels[off];
      const g = img.pixels[off + 1];
      const b = img.pixels[off + 2];
      const a = img.pixels[off + 3];

			data.push({
        r,
        g,
        b,
      });
    }	
  }

  kmeans = ml5.kmeans(data, options, ready);

	
}

function ready () {
	for (let d of kmeans.dataset) {
		const centroid = d['centroid'];
		count[centroid]++;
		centroids[centroid].r += d[0];
		centroids[centroid].g += d[1];
		centroids[centroid].b += d[2];
	}

	for(let i = 0; i < k; i++) {
		centroids[i].r /= count[i];
		centroids[i].g /= count[i];
		centroids[i].b /= count[i];
	}
	console.log(centroids)

	noStroke();

	const res = 40;

	for (let i = 0; i < res + 1; i++) {
		for (let j = 0; j < res + 1; j++) {
			const index = Math.floor(Math.random() * k)
			fill(centroids[index].r, centroids[index].g, centroids[index].b, 120);
			circle(j * WIDTH / res + 0.5 * WIDTH / res - (i%2 === 0 ? 0.5 * HEIGHT / res : 0), i * HEIGHT / res + 0.5 * HEIGHT / res, 8);
		}
	}
}
