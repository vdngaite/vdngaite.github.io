function setup() {
	createCanvas(window.innerWidth,window.innerHeight);
	//3
}

function draw() {
	/*beginShape(LINES);
	vertex(130, 130); //fin
	vertex(0, 0); //debut
	endShape();*/

	beginShape();
	vertex(20, 20);
	vertex(40, 20);
	vertex(40, 40);
	vertex(60, 40);
	vertex(60, 60);
	vertex(20, 60);
	endShape(CLOSE);
}