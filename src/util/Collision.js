import Player from "../Player";
import Projectile from "../Objects/Projectiles/Projectile";
import Enemy from "../Objects/Enemies/Enemy";

class Collision {
  constructor() {
    this.collidePlayer = this.collidePlayer.bind(this);
    this.collidePlatform = this.collidePlatform.bind(this);
    this.collidePlatTop = this.collidePlatTop.bind(this);
    this.collidePlatBottom = this.collidePlatBottom.bind(this);
    this.collidePlatLeft = this.collidePlatLeft.bind(this);
    this.collidePlatRight = this.collidePlatRight.bind(this);
    this.collideEnemy = this.collideEnemy.bind(this);
    // this.collideEnemyTop = this.collideEnemyTop.bind(this);
    // this.collideEnemyBottom = this.collideEnemyBottom.bind(this);
    // this.collideEnemyLeft = this.collideEnemyLeft.bind(this);
    // this.collideEnemyRight = this.collideEnemyRight.bind(this);
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

  collideProjectile(obj1, obj2) {
    // if (!obj1 || !obj2) return false;
    // if (obj2.dying || obj2.dead) return false;

    if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y) {

        obj1.velY = -(obj1.velY / 3);
        obj1.velX = -(obj1.velX / 3);
          ///hit
        obj1.setHit(obj2.damage);
        obj2.setHit();

        return true;

    } else {
      return false;
    }
  }



  collideEnemy(obj1, obj2) {
    // if (!obj1 || !obj2) return false;
    if (obj2.dying || obj2.dead) return false;

    if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y) {

      // if (this.hitBox(obj1, obj2)) {
      if (obj1 instanceof Player && !obj1.isHit) {
        obj1.velY = -(obj1.velY / 3);
        obj1.velX = -(obj1.velX / 3);
        ///hit
        obj1.setHit(this.damage);
      } else if (obj1 instanceof Projectile) {
        obj2.setHit(obj1.damage);
        setTimeout(() => {
          obj1.setHit();
        }, 50);
        
        return true;
      }

    } else {
      return false;
    }
  }

  // collideEnemy(obj1, obj2) {
  //     if (
  //       (obj1.bottomSide() > obj2.topSide() && (obj1.oldY + obj1.height) < obj2.topSide()) ||
  //       (obj1.topSide() < obj2.bottomSide() && (obj1.oldY + obj1.height) > obj2.bottomSide()) ||
  //       (obj1.leftSide() < obj2.rightSide() && (obj1.oldX + obj1.width) > obj2.rightSide()) ||
  //       (obj1.rightSide() > obj2.leftSide() && obj1.oldX < obj2.leftSide())) {

  //       if (obj1 instanceof Player) {
  //         obj1.velY = -(obj1.velY / 2);
  //         obj1.velX = -(obj1.velX / 2);
  //         ///hit
  //       } else if (obj1 instanceof Projectile) {
  //         obj1.setHit();
  //         return true;
  //       }

  //     } else {
  //       return false;
  //     }
  // }

  
  ///ENEMY COLLISION
// collideEnemyTop(obj1, obj2) {
//   if (obj1.bottomSide() > obj2.getTop() && (obj1.oldY + obj1.height) < obj2.getTop()) {
//     if (obj1 instanceof Projectile) {
//       obj1.setHit();
//       return true;
//     }
    
//     if (obj1 instanceof Player) {
//       obj1.velY = -(obj1.velY / 2);
//       obj1.velX = -(obj1.velX / 2);
//       ///hit
//     }
//     return true;

//   } 
//   return false;
// }

// collideEnemyBottom(obj1, obj2) {
//   if (obj1.topSide() < obj2.getBottom() && (obj1.oldY + obj1.height) > obj2.getBottom()) {
//     if (obj1 instanceof Projectile) {
//       obj1.setHit();
//       ///enemy affected?
//       return true;
//     }

//     if (obj1 instanceof Player) {
//       obj1.velY = -(obj1.velY / 2);
//       obj1.velX = -(obj1.velX / 2);
//       ///hit
//     }
//     return true;
//   }
//   return false;
// }

// collideEnemyRight(obj1, obj2) {
//   if (obj1.leftSide() < obj2.getRight() && (obj1.oldX + obj1.width) > obj2.getRight()) {
//     if (obj1 instanceof Projectile) {
//       obj1.setHit();
//       ///enemy affected?
//       return true;
//     }

//     if (obj1 instanceof Player) {
//       obj1.velY = -(obj1.velY / 2);
//       obj1.velX = -(obj1.velX / 2);
//       ///hit
//     }
//     return true;
//   }
//   return false;
// }

// collideEnemyLeft(obj1, obj2) {
//   if (obj1.rightSide() > obj2.getLeft() && obj1.oldX < obj2.getLeft()) {
//     if (obj1 instanceof Projectile) {
//       obj1.setHit();
//       ///enemy affected?
//       return true;
//     }

//     if (obj1 instanceof Player) {
//       obj1.velY = -(obj1.velY / 2);
//       obj1.velX = -(obj1.velX / 2);
//       ///hit
//     }
//     return true;
//   }
//   return false;
// }





  ////////PLATFORM COLLISION
collidePlatTop(gameObj, tileTop) {
  if (gameObj.bottomSide() > tileTop && (gameObj.oldY + gameObj.height) < tileTop) {
    if (gameObj instanceof Projectile) {
      gameObj.setHit();
      return true;
    }
    gameObj.velY = 0;
    gameObj.y = tileTop - gameObj.height - 0.01;
    if (gameObj instanceof Player) {
      gameObj.onGround = true;
      gameObj.jumpCount = 2;
    }
    return true;

  } else {
    if (gameObj instanceof Player) {
      gameObj.onGround = false;
    }
  }
  return false;
}

  collidePlatBottom(gameObj, tileBottom) {
    if (gameObj.topSide() < tileBottom && (gameObj.oldY + gameObj.height) > tileBottom) {
      gameObj.y = tileBottom + 0.05;
      gameObj.velY = 0;
      return true;
    }
    return false;
  }

  collidePlatRight(gameObj, tileRight) {
    if (gameObj.leftSide() < tileRight && (gameObj.oldX + gameObj.width) > tileRight) {
      gameObj.x = tileRight + 0.05;
      gameObj.velX = 0;

      if (gameObj instanceof Projectile) {
        gameObj.setHit();
      }

      return true;
    }
    return false;
  }

  collidePlatLeft(gameObj, tileLeft) {
    if (gameObj.rightSide() > tileLeft && gameObj.oldX < tileLeft) {
      gameObj.x = tileLeft - gameObj.width - 0.05;
      gameObj.velX = 0;
      if (gameObj instanceof Projectile) {
        gameObj.setHit();
      }
      return true;
    }
    return false;
  }

  collidePlatform(gameObject, x, y, colVal) {
    if (!colVal) return;

    switch (colVal) {
      case 1:
        this.collidePlatTop(gameObject, y);
        break;
      case 2:
        if (gameObject.velY > 0) {
          this.collidePlatTop(gameObject, y);
        }
        break;
      case 3:
        if (this.collidePlatTop(gameObject, y)) {
          return;
        } else if (this.collidePlatLeft(gameObject, x)) {
          return;
        } else {
          this.collidePlatRight(gameObject, x + 60);
        }
        break;
      case 4:
        if (this.collidePlatTop(gameObject, y)) {
          return;
        } else {
          this.collidePlatLeft(gameObject, x);
        }
        break;

    }
  }

 
}

export default Collision;
