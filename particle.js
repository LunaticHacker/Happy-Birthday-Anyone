class Particle {
  constructor(x, y, hu, firework, target) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    if (target) this.target = target.copy();
    this.maxSpeed = 10;
    this.maxForce = 0.5;
    this.acc = createVector(0, 0);
    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 10));
    }
    this.applyForce = function (force) {
      this.acc.add(force);
    };
    this.update = function () {
      if (!this.firework) {
        this.vel.mult(0.9);
        //this.lifespan -= 1;
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    };
    this.done = function () {
      if (this.vel.x == 0) {
        return true;
      } else {
        return false;
      }
    };
    this.show = function () {
      colorMode(HSB);
      if (!this.firework) {
        strokeWeight(2);
        stroke(hu, 255, 255, this.lifespan);
      } else {
        strokeWeight(4);
        stroke(hu, 255, 255);
      }
      ellipse(this.pos.x, this.pos.y, 10);
    };

    this.behaviors = function () {
      let arrive = this.arrive(this.target);
      this.applyForce(arrive);
    };

    this.arrive = function (target) {
      let desired = p5.Vector.sub(target, this.pos);
      let d = Math.floor(desired.mag());
      let speed = this.maxSpeed;
      if (d < 100) speed = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(speed);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    };
  }
}
