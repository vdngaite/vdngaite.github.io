//var data = [{"x":20,"y":20,"w":50, "h":50},{"x":100,"y":100,"w":50,"h":50}];
var url = "https://vdcgaite.github.io/daniel/processing/data/data.json";
var data ;

function preload() {
	data = loadJSON(url);
}
function setup(){
	createCanvas( window.innerWidth,window.innerHeight);
	console.log(data);
}
function draw(){

	var x = data.squares[0].x;
	var y = data.squares[0].x;
	var w = data.squares[0].w;
	var h = data.squares[0].h;
	rect(x, y, w, h);
	
	fill('red');
	var x = data.squares[1].x;
	var y = data.squares[1].x;
	var w = data.squares[1].w;
	var h = data.squares[1].h;
	rect(x, y, w, h);
}