import Player from "./player.js";
import InputHandler from "./input";
import Basicy from "./basicy";
import { buildlevel, level1 } from "./levels";
import { detectcollision } from "./collisiondetection";

const gamestate = {
  paused: 0,
  running: 1,
  menu: 2,
  gameover: 3,
  win: 4
};

export default class Game {
  constructor(gamewidth, gameheight) {
    this.gamewidth = gamewidth;
    this.gameheight = gameheight;
    this.gamestate = gamestate.menu;
    this.player = new Player(this);
    this.wincheck = 0;
    this.gameobjects = [];
    new InputHandler(this.player, this);
    this.lives = 1;
  }

  start() {
    // set line stroke and line width
    if (
      this.gamestate === gamestate.running ||
      this.gamestate === gamestate.paused
    ) {
      return;
    }

    let basicy = buildlevel(this, level1);
    // for (let i = 2; i < 10; i++) {
    //   basicy.push(new Basicy(this, { x: i * 150, y: 10 }, { x: 0, y: 5 }));
    // }

    this.gameobjects = [this.player, ...basicy];
    this.lives = 1;
    this.wincheck = 0;
    this.gamestate = gamestate.running;
  }

  update(deltatime) {
    if (this.lives === 0) this.gamestate = gamestate.gameover;

    if (
      this.gamestate === gamestate.paused ||
      this.gamestate === gamestate.menu ||
      this.gamestate === gamestate.gameover
    )
      return;

    this.gameobjects.forEach((object) => object.update(deltatime));

    if (this.player.position.x >= 1200) {
      this.wincheck = 1;
    }

    if (this.player.position.x <= 300 && this.wincheck === 1) {
      this.gamestate = gamestate.win;
    }
  }

  draw(ctx) {
    ctx.rect(300, 0, 900, this.gameheight);
    ctx.fillStyle = "#ffdbcc";
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    // draw a black
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 550);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 550);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(900, 0);
    ctx.lineTo(900, 550);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1200, 0);
    ctx.lineTo(1200, 550);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 275);
    ctx.lineTo(1200, 275);
    ctx.stroke();

    this.gameobjects.forEach((object) => object.draw(ctx));

    if (this.gamestate === gamestate.paused) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fill();

      ctx.font = "100px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText("Timeout", this.gamewidth / 2, this.gameheight / 2);
      ctx.font = "50px Arial";
      ctx.fillText("Arrow Keys to Move, P to Unpause", this.gamewidth / 2, 500);
    }

    if (this.gamestate === gamestate.menu) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "100px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText("Patintero", this.gamewidth / 2, this.gameheight / 2);

      ctx.font = "50px Arial";
      ctx.fillText(
        "Arrow Keys to Move, P for Pause, Space to Start",
        this.gamewidth / 2,
        500
      );
    }

    if (this.gamestate == gamestate.gameover) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "100px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gamewidth / 2, this.gameheight / 2);

      ctx.font = "50px Arial";
      ctx.fillText("Space to Restart", this.gamewidth / 2, 500);
    }

    if (this.gamestate === gamestate.win) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "100px Arial";
      ctx.fillStyle = "White";
      ctx.textAlign = "center";
      ctx.fillText(
        "You Win!, Drink some water.",
        this.gamewidth / 2,
        this.gameheight / 2
      );

      ctx.font = "50px Arial";
      ctx.fillText("Space to Restart", this.gamewidth / 2, 500);
    }
  }

  togglepause() {
    if (this.gamestate === gamestate.paused) {
      this.gamestate = gamestate.running;
    } else {
      this.gamestate = gamestate.paused;
    }
  }
}
