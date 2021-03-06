class Controller {
  constructor(player, game) {
    this.player = player;
    this.game = game

    this.keysPressed = {};
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
  }

  keydown(event) {
    if (!this.game.gameOver) {
      event.preventDefault();
    }
    this.player.idle = false;
    this.player.keydown = true;
    
    switch (Controller.KEYS[event.key]) {

      case "left":
        this.keysPressed.left = true;
        this.player.crouch = false;
        this.player.direction = "left";
        this.player.velX = -7;

        break;

      case "right":
        this.keysPressed.right = true;
        this.player.crouch = false;
        this.player.direction = "right";
        this.player.velX = 7;
        break;

      case "up":
        this.keysPressed.up = true;
        this.player.upPressed = this.keysPressed.up;

        if (this.player.canClimb) {
          this.player.crouch = false;
          this.player.climbing = true;
          this.player.velY = -7;
        }
        break;

      case "down":
        this.keysPressed.down = true;
        ///For jump down attack///
        this.player.downKey = true;

        if (this.player.canClimb) {
          this.player.climbing = true;
          this.player.velY = 7;
          return;
        }
        if (
          this.player.velY >= 0 &&
          this.player.velY < 1 &&
          !this.player.crouch
        ) {
          this.player.crouch = true;
        }
        break;

      case "jump":
        this.keysPressed.jump = true;
        this.player.crouch = false;
        this.player.climbing = false;
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
        break;

      case "space":
        this.game.pause = !this.game.pause;
        if (this.game.pause) {
          clearInterval(this.game.frameInterval);
          clearInterval(this.level.spawnInterval);
        } else {
          this.game.startFrameCount();
          this.game.level.enemiesInterval();
        }
        break;

      case "HUD":
        this.game.showHUD = !this.game.showHUD;
        break;

      default:
        return;
    }

  }

  keyup(event) {
    event.preventDefault();

    switch (Controller.KEYS[event.key]) {

      case "left":
        this.keysPressed.left = false;
        this.player.runningKeyDown = false;
        if (!this.keysPressed.left && !this.keysPressed.right) this.player.velX = 0;
        break;

      case "right":
        this.keysPressed.right = false;
        if (!this.keysPressed.left && !this.keysPressed.right) this.player.velX = 0;
        break;

      case "up":
        this.keysPressed.up = false;
        this.player.upPressed = this.keysPressed.up;
        if (this.player.climbing) {
          this.player.velY = 0;
        }

        break;
      case "down":
        this.keysPressed.down = false;
        if (this.player.climbing) {
          this.player.velY = 0;
        }
        if (
          this.player.velY >= 0 &&
          this.player.velY < 1 &&
          this.player.crouch
        ) {
          this.player.crouch = false;
          return;
        }
        break;

      case "jump":
        this.keysPressed.jump = false;
        this.jumpKey = false;
        break;

      case "fire":
        this.keysPressed.fire = false;
        break;

      case "dash":
        this.keysPressed.dash = false;
        break;

      default:
        return;
    }
    this.player.idle = true;
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
  " ": 'space',
  "ArrowLeft": 'left',
  "ArrowUp": 'up',
  "ArrowRight": 'right',
  "ArrowDown": 'down',
  "a": 'left',
  "w": 'up',
  "d": 'right',
  "s": 'down',
  "Shift": 'jump',
  "z": 'fire',
  "/": 'fire',
  "Enter": 'enter',
  "h": 'HUD'
};



export default Controller;