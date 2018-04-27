
function setup(){
	createCanvas( window.innerWidth,window.innerHeight, WEBGL);
}
function draw(){

	rotateX(frameCount * 0.01);
	rotateY(frameCount * 0.01);
	beginShape(QUADS);
	fill(0, 1, 1); vertex(-100,  100,  100);
	fill(1, 1, 1); vertex( 100,  100,  100);
	fill(1, 0, 1); vertex( 100, -100,  100);
	fill(0, 0, 1); vertex(-100, -100,  100);

	fill(1, 1, 1); vertex( 100,  100,  100);
	fill(1, 1, 0); vertex( 100,  100, -100);
	fill(1, 0, 0); vertex( 100, -100, -100);
	fill(1, 0, 1); vertex( 100, -100,  100);

	fill(1, 1, 0); vertex( 100,  100, -100);
	fill(0, 1, 0); vertex(-100,  100, -100);
	fill(0, 0, 0); vertex(-100, -100, -100);
	fill(1, 0, 0); vertex( 100, -100, -100);

	fill(0, 1, 0); vertex(-100,  100, -100);
	fill(0, 1, 1); vertex(-100,  100,  100);
	fill(0, 0, 1); vertex(-100, -100,  100);
	fill(0, 0, 0); vertex(-100, -100, -100);

	fill(0, 1, 0); vertex(-100, 100, -100);
	fill(1, 1, 0); vertex( 100,  100, -100);
	fill(1, 1, 1); vertex( 100,  100,  100);
	fill(0, 1, 1); vertex(-100,  100,  100);

	fill(0, 0, 0); vertex(-100, -100, -100);
	fill(1, 0, 0); vertex( 100, -100, -100);
	fill(1, 0, 1); vertex( 100, -100,  100);
	fill(0, 0, 1); vertex(-100, -100,  100);

	endShape();
}