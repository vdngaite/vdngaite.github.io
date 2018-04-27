var halfWidth = window.innerWidth * 0.5;
var halfHeight = window.innerHeight * 0.5;

function setup() {
	createCanvas(window.innerWidth,window.innerHeight);
	//3
	background(51);
}

function draw() {
	//4
	fill('red');
	//3
	strokeWeight(4);
	stroke('red');
	//2
	line(30, 20, 85, 75);
  	//1
  	ellipse(halfWidth, halfHeight, 80, 80);
  	//5
  	triangle(130, 75, 158, 20, 186, 75);
}