
class Collision {
  constructor() {
    this.collidePlayer = this.collidePlayer.bind(this);
    this.collidePlatform = this.collidePlatform.bind(this);
    this.collidePlatTop = this.collidePlatTop.bind(this);
    this.collidePlatBottom = this.collidePlatBottom.bind(this);
    this.collidePlatLeft = this.collidePlatLeft.bind(this);
    this.collidePlatRight = this.collidePlatRight.bind(this);
  }

  collidePlayer(player, canvas) {
    // debugger
    if (player.x < 0) {
      player.x = 0.01;
      player.velX = 0;
    } else if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
      player.velX = 0;
    }

    if (player.y < 0) {
      player.velY = 0;
      player.y = 0.01;
    } else if (player.y + player.height > canvas.height) {
      player.velY = 0;
      player.y = canvas.height - player.height - 0.1;
      player.jumpCount = 2;
      player.onGround = true;
    }
  }

  collidePlatTop(player, tile, level) {
    if (player.bottomSide() < level.getTop(...tile)) {
      player.velY = 0;
      player.y = level.getTop(...tile) - player.height - 0.01;
      player.onGround = true;
      player.jumpCount = 2;
      return true;
    }
    return false;
  }

  collidePlatBottom(player, tile, level) {
    if (player.topSide() > level.getBottom(...tile)) {
      player.y = level.getBottom(...tile);
      return true;
    }
    return false;
  }

  collidePlatRight(player, tile, level) {
    if (player.leftSide() < level.getRight(...tile)) {
      player.velX = 0;
      player.x = level.getRight(...tile) + 0.01;

      return true;
    }
    return false;
  }

  collidePlatLeft(player, tile, level) {
    if (player.rightSide() > level.getLeft(...tile)) {
      player.velX = 0;
      player.x = level.getLeft(...tile);
      return true;
    }
    return false;
  }

  collidePlatform(player, tile, colVal, level) {
    if (!colVal) return;

    switch (colVal) {
      case 1:
        this.collidePlatTop(player, tile, level);
        break;
      case 2:
        this.collidePlatTop(player, tile, level);
        break;
      case 3:
        if (this.collidePlatTop(player, tile, level)) {
          return;
        } else if (this.collidePlatLeft(player, tile, level)) {
          return;
        } else {
          this.collidePlatRight(player, tile, level);
        }
        break;
      case 4:
        if (this.collidePlatTop(player, tile, level)) {
          return;
        } else {
          this.collidePlatLeft(player, tile, level);
        }
        break;
      default:
        break;
    }
  }
}

export default Collision;
