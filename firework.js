class Firework {
  constructor() {
    this.hu = random(255);
    this.firework = new Particle(
      random(width) - width / 2,
      height,
      this.hu,
      true
    );
    this.exploded = false;
    this.particles = [];
    this.done = function () {
      if (this.exploded && this.particles.length === 1) {
        return true;
      } else {
        return false;
      }
    };
    this.update = function () {
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();
        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      }
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].update();
        this.particles[i].behaviors();
        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    };
    this.explode = function () {
      for (var a = 0; a < TWO_PI; a += 0.1) {
        const r = 20;
        const x = r * 16 * pow(sin(a), 3);
        const y =
          -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        var p = new Particle(
          this.firework.pos.x,
          this.firework.pos.y,
          this.hu,
          false,
          createVector(x, y)
        );
        this.particles.push(p);
      }
    };
    this.show = function () {
      if (!this.exploded) {
        this.firework.show();
      }
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    };
  }
}
