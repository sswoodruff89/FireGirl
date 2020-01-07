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
        // this.player.direction = "left";
        this.player.velX = -10;

        break;
      case "right":
        // this.player.direction = "right";
        this.player.velX = 10;
        break;
      case "up":
        this.player.y -= 10;
        break;
      case "down":
        this.player.y += 10;
        break;
      case "jump":
        this.player.jump();
        break;
      case "space":
        // this.gameview.Ticker.paused = (this.gameview.Ticker.paused) ? false: true;
        break;
      default:
        return;
    }
    console.log(this.player.x);
    console.log(this.player.y);
    console.log(this.player.onGround);
    console.log(this.player.velX);
    console.log(this.player.velY);
    // console.log(this.player.edgeBounds());
    console.log(this.player.onGround);
    // console.log(this.player.edgeBounds());
    // console.log(this.player.model.getBounds());
    // console.log(this.player.model.w);
    // console.log(this.player.model.h);

    // console.log(this.player.edgeBounds());
  }

  keyup(event) {
    this.player.idle = true;
    this.player.keydown = false;
  }
}


Controller.KEYS = {
  19: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'jump'
};

export default Controller;