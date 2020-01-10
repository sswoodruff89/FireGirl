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

  }

  collidePlayer(player, canvas, cleared) {
    // debugger
    if (player.x < 0) {
      player.x = 0.01;
      player.velX = 0;
    } else if (player.x + player.width > canvas.width && !cleared) {
      player.x = canvas.width - player.width;
      player.velX = 0;
    }

    // if (player.y < 0) {
    //   player.velY = 0;
    //   player.y = 0.01;
    // } else 
    if (player.y > canvas.height) {
      // player.velY = 0;
      // player.y = canvas.height - player.height - 0.1;
      // player.jumpCount = 2;
      // player.onGround = true;
      // player.dead = true;
      player.y = 0;
      player.setHit(50);
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
        return true;
      }
      if (obj1 instanceof Projectile) {
        obj2.setHit(obj1.damage);
        setTimeout(() => {
          obj1.setHit();
        }, 10);
        
        return true;
      }

    } else {
      return false;
    }
  }



  




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
      if (gameObj instanceof Projectile) {
        gameObj.setHit();
      }
      gameObj.y = tileBottom + 0.05;
      gameObj.velY = 0;
      return true;
    }
    return false;
  }

  collidePlatRight(gameObj, tileRight) {
    if (gameObj.leftSide() < tileRight && (gameObj.oldX + gameObj.width) > tileRight) {
      if (gameObj instanceof Projectile) {
        gameObj.setHit();
      }
      gameObj.x = tileRight + 0.05;
      // gameObj.velX = 0;


      return true;
    }
    return false;
  }

  collidePlatLeft(gameObj, tileLeft) {
    if (gameObj.rightSide() > tileLeft && gameObj.oldX < tileLeft) {
      if (gameObj instanceof Projectile) {
        gameObj.setHit();
      }
      gameObj.x = tileLeft - gameObj.width - 0.05;
      // gameObj.velX = 0;
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
        } else if (this.collidePlatRight(gameObject, x + 60)) {
          return;
        } else {
          this.collidePlatLeft(gameObject, x);
          break;
        };
      case 5:
        if (this.collidePlatTop(gameObject, y)) {
          return;
        } else if (this.collidePlatBottom(gameObject, y + 60)) {
          return;
        } else {
          this.collidePlatRight(gameObject, x + 60);
        }
        break;
      case 6: 
        if (this.collidePlatTop(gameObject, y)) {
          return;
        } else {
          this.collidePlatBottom(gameObject, y + 60);
        }
        break;
      case 7: 
        //thorn
        this.collidePlatBottom(gameObject, y + 10);
        if (gameObject instanceof Player) {

          gameObject.setHit(5);
        }
          
        break;
      case 8: 
        if (this.collidePlatTop(gameObject, y)) {
          return;
        } else {
          this.collidePlatRight(gameObject, x + 60);
        }
        break;
      case 9: 
        this.collidePlatLeft(gameObject, x);
        break;
      case 10:
        this.collidePlatRight(gameObject, x + 60);
        break;
      case 11:
        //thorn
        if (this.collidePlatLeft(gameObject, x)) {
          if (gameObject instanceof Player) {
            gameObject.setHit(5);
          }
          return;
        } else if (this.collidePlatBottom(gameObject, y + 10)) {
          if (gameObject instanceof Player) {
            gameObject.setHit(5);
          }
          return;
        } else {
          this.collidePlatRight(gameObject, x + 60);
          if (gameObject instanceof Player) {
            gameObject.setHit(5);
          }
        }
        break;
    }
  }

 
}

export default Collision;
