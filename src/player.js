import { detectcollision } from "./collisiondetection";

export default class Player {
  constructor(game) {
    this.gamewidth = game.gamewidth;
    this.gameheight = game.gameheight;
    this.width = 50;
    this.height = 50;
    this.size = 50;

    this.maxspeed = 10;
    this.speed = 0;
    this.maxspeedy = 10;
    this.speedy = 0;

    this.position = {
      x: 10,
      y: this.gameheight / 2
    };
  }

  moveleft() {
    this.speed = -this.maxspeed;
  }

  moveright() {
    this.speed = +this.maxspeed;
  }

  movedown() {
    this.speedy = +this.maxspeedy;
  }

  moveup() {
    this.speedy = -this.maxspeedy;
  }

  stop() {
    this.speed = 0;
  }

  stopy() {
    this.speedy = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltatime) {
    this.position.x += this.speed;
    this.position.y += this.speedy;
    //check left or right
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gamewidth)
      this.position.x = this.gamewidth - this.width;
    //check up or down
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.height > this.gameheight)
      this.position.y = this.gameheight - this.height;
  }

  reset() {
    this.position = {
      x: 10,
      y: this.gameheight / 2
    };
  }
}
