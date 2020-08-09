let angle = 0;
let img;
let graphics;
let fireworks = [];
let gravity;
let searchParams = new URLSearchParams(window.location.search);
let param = "Anyone";
if (searchParams.has("name")) param = searchParams.get("name");
let capture;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  capture = createCapture(VIDEO);
  capture.hide();
  gravity = createVector(0, 0.2);
  graphics = createGraphics(width, height);
  graphics.background(0);
  graphics.fill(255);
  graphics.textSize(30);
  graphics.textAlign(CENTER);
  graphics.translate(width / 2, height / 2);
}

function draw() {
  background(200);
  graphics.background(0);
  graphics.text(`Happy Birthday ${param}`, 0, -200);
  if (random(1) < 0.01) {
    fireworks.push(new Firework());
  }
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  texture(capture);
  box(80);
  pop();
  texture(graphics);
  plane(width, height);
}
