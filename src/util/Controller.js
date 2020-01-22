class Controller {
  constructor(player) {
    // this.gameview = gameview;
    this.player = player;

    this.keysPressed = {};

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
  }

  keydown(event) {
    event.preventDefault();
    this.player.idle = false;
    this.player.keydown = true;
    
    switch (Controller.KEYS[event.key]) {
    // switch (Controller.KEYS[event.keyCode]) {
      case "left":
        this.keysPressed.left = true;
        // this.player.runningKeyDown = true;
        this.player.direction = "left";
        this.player.velX = -7;

        break;
      case "right":
        this.keysPressed.right = true;
        // this.player.runningKeyDown = true;

        this.player.direction = "right";
        this.player.velX = 7;
        break;
      case "up":
        this.keysPressed.up = true;
        this.player.upPressed = this.keysPressed.up;

        if (this.player.canClimb) {
          console.log(this.player.canClimb);
          console.log(this.player.idle);

          this.player.climbing = true;
          this.player.velY = -7;
        }
        break;
      case "down":
        this.keysPressed.down = true;
        if (this.player.canClimb) {
          console.log(this.player.canClimb);
          this.player.climbing = true;
          this.player.velY = 7;
        }
        break;
      case "jump":
        this.keysPressed.jump = true;
        this.player.jump();
        break;
      case "fire":

        this.keysPressed.fire = true;
        if (this.keysPressed.up) {
          this.player.shootFire("up");
        } else if (this.keysPressed.down && !this.player.onGround) {
          this.player.shootFire("down");
        } else {
          this.player.shootFire();

        }
        break;
      case "dash":
        this.keysPressed.dash = true;
        // this.player.dash = true;
        // if (this.keysPressed.left || this.keysPressed.right) {
        //   this.player.dash();
        // }
        // if (this.player.direction === "right") {
        //   this.player.velX = 14;
        // } else {
        //   this.player.velX = -14;
        // }
      case "space":
        // this.gameview.Ticker.paused = (this.gameview.Ticker.paused) ? false: true;
        break;
      default:
        return;
    }

  }

  keyup(event) {
    // if (Controller.KEYS[event.keyCode] === "left" ||
    //   Controller.KEYS[event.keyCode] === "right") {
      // this.player.keydown = false;
    //   // this.player.velX = 0;
    //   // this.player.idle =ß true;
    //   return;
    // }
    event.preventDefault();

    switch (Controller.KEYS[event.key]) {
    // switch (Controller.KEYS[event.keyCode]) {

      case "left":
        this.keysPressed.left = false;
        // this.player.velX = 0;
        this.player.runningKeyDown = false;

        if (!this.keysPressed.left && !this.keysPressed.right) this.player.velX = 0;

        break;
      case "right":
        this.keysPressed.right = false;
        // this.player.runningKeyDown = false;

        // this.player.velX *= -1;
        if (!this.keysPressed.left && !this.keysPressed.right) this.player.velX = 0;
        break;
      case "up":
        this.keysPressed.up = false;
        this.player.upPressed = this.keysPressed.up;

        if (this.player.climbing) this.player.climbing = false;
        break;
      case "down":
        this.keysPressed.down = false;
        break;
      case "jump":
        this.keysPressed.jump = false;
        break;
      case "fire":
        this.keysPressed.fire = false;
        break;
      case "dash":
        this.keysPressed.dash = false;
      case "space":
        // this.gameview.Ticker.paused = (this.gameview.Ticker.paused) ? false: true;
        break;
      default:
        return;
    }


    this.player.idle = true;
    // this.keysPressed = {};
    // console.log(Controller.KEYS[event.keyCode])
    // debugger

  }
}


// Controller.KEYS = {
//   19: 'space',
//   37: 'left',
//   38: 'up',
//   39: 'right',
//   40: 'down',
//   65: 'jump',
//   68: 'fire',
//   83: 'dash',
//   13: 'enter'
// };

Controller.KEYS = {
  "space": 'space',
  "ArrowLeft": 'left',
  "ArrowUp": 'up',
  "ArrowRight": 'right',
  "ArrowDown": 'down',
  "a": 'jump',
  "d": 'fire',
  "s": 'dash',
  "Enter": 'enter'
};



export default Controller;