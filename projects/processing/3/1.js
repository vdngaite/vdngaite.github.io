var i = 0;
var halfWidth = window.innerWidth * 0.5;
var halfHeight = window.innerHeight * 0.5;

function setup() {
	createCanvas( window.innerWidth,window.innerHeight);
	background(51);
}

function draw() {
	console.log("i:",i);
	fill('red');
	stroke('red');
  	ellipse(i, halfHeight, 80, 80);
  	i++;
}