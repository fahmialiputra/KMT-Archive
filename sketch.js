// script ini menggunakan library p5.js

var angle = 0;
var size_sun = 6.96;
var G, M, dt, v;
G = 6.6743 * Math.pow(10, -11);
var n = 0;
var skala = 105120; // 1 kali revolusi bumi dalam 300 gerakan
var dtheta;
// v = r * dtheta/dt
// v square = G * M / r
// dtheta/dt = square root (G * M / r cubic)

let c;
// const duration = 5; //in second
// const capturer = new CCapture( {
//    format: "webm",
//    name: "Pemodelan Gravitasi Newton",
//    framerate: 60,
//    quality: 100,
//    verbose: false
//} );

function setup() {
	c = createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	r = parseFloat(prompt("Distance from Sun (R, x10^6 Km )", "Enter a value")); // input R diubah format ke dalam float;
	M = parseFloat(prompt("Mass of Sun (M, x10^30 Kg)", "Enter a value")); // input M diubah format ke dalam float;
	dt = Math.sqrt(G*M*Math.pow(10, 30)/Math.pow(r*Math.pow(10, 9), 3));
	v = r*Math.pow(10,9)*dt;
	dtheta = degrees(dt)*skala;
	// debugMode(); // untuk melihat sumbu dan lintang bidang datar
}

function draw() {
//    if(frameCount === 1) {capturer.start();}
	background(10);
	orbitControl(1,1,0.25)
	rotateX(90);
	noStroke();
	fill(0, 255, 255);
	planet(size_sun/2, r*10, 5, angle); // planet(ukuran, jarak dari pusat, kemiringan orbit, posisi)
	push();
		rotateX(-90);
		fill(255, 255, 0);
		noStroke();
		sphere(size_sun, 24, 24); // membuat pusat revolusi planet
	pop();
	// if(n <= 0) {console.log(v + " " + r*cos(angle) + " " + r*sin(angle));}
//	capturer.capture(c.canvas);
	// if(n > duration*60 - 1) {
	// 	console.log(v + " " + r*cos(angle) + " " + r*sin(angle));  // untuk menampilkan nilai kecepatan dan posisi dalam koordinat (x,y)
	// } else {
//		capturer.stop();
//		capturer.save();
//		noLoop();
//		print('Process Terminated');
//	}
	angle += dtheta;
	n++;
}

//function keyPressed() {
//	if(keyCode === '') {
//		capturer.stop();
//		capturer.save();
//		noLoop();
//		print('Process Terminated');
//	}
//}

function planet(size, dist, tilt, theta) {	
	push();
		rotateY(tilt); //kemiringan orbit planet
		push();
			noFill();
			stroke(255);
			ellipse(0, 0, 2*dist, 2*dist, 50); // membuat orbit planet
		pop();
		push();
			translate(dist*cos(theta), dist*sin(theta), 0); // revolusi planet
			push();
				// fill(0,125,125);
				// noStroke();
				noFill();
				stroke(255);
				rotateX(-90);
				rotateY(theta*2); // rotasi planet
				rotateZ(15*sin(theta)); // kemiringan planet
				sphere(size, 24, 24);
			pop();
		pop();
	pop();
}