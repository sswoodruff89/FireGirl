class GameHUD {
  constructor(options) {
    // this.health = options.health;
    // this.name = name;
    this.fire = this.loadImage();
    

    this.drawHealth = this.drawHealth.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.drawHUD = this.drawHUD.bind(this);
    this.drawAmmo = this.drawAmmo.bind(this);
  }

  loadImage() {
    let img = new Image();
    img.src = "./assets/fireball.png";
    return img;
  }

  drawHUD(canvas, ctx, player, frameCount) {
    ctx.beginPath();
    ctx.rect(0, (canvas.height - 55), canvas.width, 55);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    this.drawHealth(canvas, ctx, player);
    this.drawAmmo(canvas, ctx, player, frameCount);
  }


  drawHealth(canvas, ctx, player) {

    let healthMeter = ((canvas.width / 2) * (player.health / 200));

    ctx.beginPath();
    ctx.rect(20, (canvas.height - 40), (canvas.width / 2), 25);
    ctx.fillStyle = "rgba(255, 255, 255, .1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(20, (canvas.height - 40), (healthMeter), 25);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  drawAmmo(canvas, ctx, player, frameCount) {
    // let healthMeter = ((canvas.width - ) * (player.health / 200));
    let fromRight = canvas.width - 50;
    ctx.beginPath();
    ctx.arc(fromRight, canvas.height - 24, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, .1)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(canvas.width - 100, canvas.height - 24, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, .1)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(canvas.width - 150, canvas.height - 24, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, .1)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx.stroke();
    ctx.closePath();


    switch (Object.keys(player.fireballs).length) {
      case 0: 
        ctx.drawImage(
          this.fire,
          (frameCount % 8) * 43 + (((frameCount % 8) + 1) * 21),
          400,
          22,
          35,
          canvas.width - 170, canvas.height - 50,
          40, 40
        );
      case 1:
        ctx.drawImage(
          this.fire,
          (frameCount % 8) * 43 + (((frameCount % 8) + 1) * 21),
          400,
          22,
          35,
          canvas.width - 120, canvas.height - 50,
          40, 40
        );
      case 2:
        ctx.drawImage(
          this.fire,
          (frameCount % 8) * 43 + (((frameCount % 8) + 1) * 21),
          400,
          22,
          35,
          canvas.width - 70, canvas.height - 50,
          40, 40
        );
      default:
        break;

    }


  }


}

export default GameHUD;