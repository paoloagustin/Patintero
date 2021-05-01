import Player from "./player.js";
import InputHandler from "./input";
import Basicy from "./basicy";
import Game from "./game.js";

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

const game_width = 1330;
const game_height = 550;

let game = new Game(game_width, game_height);

ctx.clearRect(0, 0, 1330, 550);

let lasttime = 0;

//images

function gameloop(timestamp) {
  let deltatime = timestamp - lasttime;
  lasttime = timestamp;

  ctx.clearRect(0, 0, game_width, game_height);

  game.update(deltatime);
  game.draw(ctx);

  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
