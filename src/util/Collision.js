
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

  collidePlatTop(player, tileTop) {
    if (player.bottomSide() > tileTop && player.oldY < tileTop) {
      player.velY = 0;
      player.y = tileTop - player.height - 0.01;
      player.onGround = true;
      player.jumpCount = 2;
      return true;
    } else {
      player.onGround = false;
    }
    return false;
  }

  collidePlatBottom(player, tileBottom) {
    // debugger
    if (player.topSide() < tileBottom && (player.oldY + player.height) > tileBottom) {
      player.y = tileBottom + 0.05;
      player.velY = 0;
      return true;
    }
    return false;
  }

  collidePlatRight(player, tileRight) {
    // debugger
    if (player.leftSide() < tileRight && (player.oldX + player.width) > tileRight) {
      player.x = tileRight + 0.05;
      player.velX = 0;

      return true;
    }
    return false;
  }

  collidePlatLeft(player, tileLeft) {
    if (player.rightSide() > tileLeft && player.oldX < tileLeft) {
      player.x = tileLeft - 0.05;
      player.velX = 0;
      return true;
    }
    return false;
  }

  collidePlatform(player, x, y, colVal) {
    if (!colVal) return;

    switch (colVal) {
      case 1:
        // debugger
        this.collidePlatTop(player, y);
        break;
      case 2:
        this.collidePlatTop(player, y);
        break;
      case 3:
        if (this.collidePlatTop(player, y)) {
          return;
        } else if (this.collidePlatLeft(player, x)) {
          return;
        } else {
          this.collidePlatRight(player, x + 60);
        }
        break;
      case 4:
        if (this.collidePlatTop(player, y)) {
          return;
        } else {
          this.collidePlatLeft(player, x);
        }
        break;

    }
  }

  // collidePlatTop(player, tileTop) {
  //   if (player.bottomSide() > tileTop) {
  //     // debugger
  //     player.velY = 0;
  //     player.y = tileTop - player.height - 0.05;
  //     player.onGround = true;
  //     player.jumpCount = 2;
  //     return true;
  //   }
  //   return false;
  // }

  // collidePlatBottom(player, tileBottom) {
  //   // debugger
  //   if (player.topSide() < tileBottom) {
  //     player.y = tileBottom + 0.05;
  //     return true;
  //   }
  //   return false;
  // }

  // collidePlatRight(player, tileRight) {
  //   // debugger
  //   if (player.leftSide() < tileRight) {
  //     player.x = tileRight + 0.01;
  //     player.velX = 0;

  //     return true;
  //   }
  //   return false;
  // }

  // collidePlatLeft(player, tileLeft) {
  //   if (player.rightSide() > tileLeft - 0.01) {
  //     player.x = tileLeft - 0.01;
  //     player.velX = 0;
  //     return true;
  //   }
  //   return false;
  // }

  // collidePlatform(player, tile, colVal, level) {
  //   if (!colVal) return;

  //   switch (colVal) {
  //     case 1:
  //       // debugger
  //       this.collidePlatTop(player, level.getTop(...tile));
  //       break;
  //     case 2:
  //       this.collidePlatTop(player, level.getTop(...tile));
  //       break;
  //     case 3:
  //       if (this.collidePlatTop(player, level.getTop(...tile))) {
  //         return;
  //       } else if (this.collidePlatLeft(player, level.getLeft(...tile))) {
  //         return;
  //       } else {
  //         this.collidePlatRight(player, level.getRight(...tile));
  //       }
  //       break;
  //     case 4:
  //       if (this.collidePlatTop(player, level.getTop(...tile))) {
  //         return;
  //       } else {
  //         this.collidePlatLeft(player, level.getLeft(...tile));
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }
}

export default Collision;
