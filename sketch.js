var fireworks = [];
var gravity;
var font;
var texts = ["Happy", "B'day", "Anyone"];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
  fireworks.push(new Firework());
}

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}

function draw() {
  translate(width / 2, height / 2);
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.01) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done() && i == 0) {
      if (texts.length > 0) {
        if (texts[0].length <= 5) {
          points = font.textToPoints(
            texts[0],
            -300 + (5 % texts[0].length) * 100,
            0,
            192,
            {
              sampleFactor: 0.25,
            }
          );
        } else {
          points = font.textToPoints(texts[0], -300, 0, 192, {
            sampleFactor: 0.25,
          });
        }
        for (p of points) {
          fireworks[i].particles.push(
            new Particle(0, 0, 255, false, createVector(p.x, p.y))
          );
        }
        texts.shift();
      } else {
        fireworks.splice(i, 1);
      }
    }
  }
}
