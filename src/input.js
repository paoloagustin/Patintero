import Game from "./game";

export default class InputHandler {
  constructor(player, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          //alert("move left")
          player.moveleft();
          break;

        case 39:
          //alert("move right");
          player.moveright();
          break;

        case 38:
          //alert("move up");
          player.moveup();
          break;

        case 40:
          //alert("move down");
          player.movedown();
          break;

        case 27:
          game.togglepause();
          break;

        case 80:
          game.togglepause();
          break;

        case 32:
          game.start();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (player.speed < 0) player.stop();
          break;

        case 39:
          if (player.speed > 0) player.stop();
          break;

        case 38:
          if (player.speedy < 0) player.stopy();
          break;

        case 40:
          if (player.speedy > 0) player.stopy();
          break;

        case 32:
          game.start();
          break;

        default:
          break;
      }
    });
  }
}
