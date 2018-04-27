var i = 0;
var halfWidth = window.innerWidth * 0.5;
var halfHeight = window.innerHeight * 0.5;

function setup() {
	createCanvas( window.innerWidth,window.innerHeight);
	background(51);
}

function draw() {
	console.log("i:",i);
	//push(); // Start a new drawing state
	fill('white');
	stroke('white');
  	ellipse(halfWidth, halfHeight, i, i);
  	//pop(); // Restore original state
  	i++;
  	if(i >= 500){
  		fill('black');
  		textSize(30);
		textAlign(CENTER);
		text('mail: vdcgaite@gmail.com', halfWidth, halfHeight);
		textAlign(CENTER);
		text('facebook: vdcgaite', halfWidth, halfHeight+50);
  	}
}