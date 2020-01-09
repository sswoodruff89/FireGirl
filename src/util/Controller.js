class Controller {
  constructor(player) {
    // this.gameview = gameview;
    this.player = player;

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
  }
  
  keydown(event) {
    this.player.idle = false;
    this.player.keydown = true;

    switch (Controller.KEYS[event.keyCode]) {
      case "left":
        this.player.direction = "left";
        this.player.velX = -8;
        break;
      case "right":
        this.player.direction = "right";
        this.player.velX = 8;
        break;
      case "up":
        // this.player.y -= 10;
        break;
      case "down":
        // this.player.y += 10;
        break;
      case "jump":
        this.player.jump();
        break;
      case "fire":
        this.player.shootFire();
        break;
      case "space":
        // this.gameview.Ticker.paused = (this.gameview.Ticker.paused) ? false: true;
        break;
      default:
        return;
    }
 
  }

  keyup(event) {
    this.player.idle = true;
    // console.log(Controller.KEYS[event.keyCode])
    // debugger
    if (Controller.KEYS[event.keyCode] === "left" || 
      Controller.KEYS[event.keyCode] === "right" ) {
        this.player.keydown = false;

      }
      // console.log(this.player.keydown)
  }
}


Controller.KEYS = {
  19: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'jump',
  68: 'fire'
};

export default Controller;