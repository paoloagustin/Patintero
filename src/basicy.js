import { detectcollision } from "./collisiondetection.js";

export default class Basicy {
  constructor(game, position, speed) {
    this.image = document.getElementById("img_enemy");
    this.position = position;
    this.speed = speed;
    this.size = 50;

    this.game = game;

    this.gamewidth = game.gamewidth;
    this.gameheight = game.gameheight;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltatime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //check walls left or right
    if (
      this.position.x + this.size > this.gamewidth - 130 ||
      this.position.x < 300
    ) {
      this.speed.x = -this.speed.x;
    }
    //check walls up or down
    if (this.position.y + this.size > this.gameheight || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    if (detectcollision(this, this.game.player)) {
      this.game.lives--;

      this.game.player.reset();
    }
  }
}
