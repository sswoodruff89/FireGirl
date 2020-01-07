
class Collision {
  constructor() {


    this.collidePlayer = this.collidePlayer.bind(this);
    
  }

  // collidePlayer(player, canvas) {
  //   debugger
  //   if (player.x < 0) {
  //     player.x = 0;
  //     player.velX = 0;
  //   } else if (player.x + player.width > canvas.width) {
  //     player.x = canvas.width - player.width;
  //     player.velX = 0;
  //   }

  //   if (player.y < 0) {
  //     player.resetGrounded();
  //     player.y = 0;
  //     player.velY = 0;
  //   } else if (player.y + player.height > canvas.height) {
  //     player.y = canvas.height - player.height;
  //     player.velY = 0;
  //   } 
  // }
  collidePlayerLeft(player, canvas) {
    debugger
    return player.x < 0;
  }

  collidePlayerRight(player, canvas) {
    return player.x + player.width > canvas.width;  
  }
  collidePlayerTop(player, canvas) {
    return player.y < 0;  
  }
  collidePlayerBottom(player, canvas) {
    return player.y + player.height > canvas.height;  
  }

  platformTopCollide() {

  }

  
}

export default Collision;
