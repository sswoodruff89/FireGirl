class GameHUD {
  constructor(options) {
    // this.health = options.health;
    // this.name = name;
    this.fire = this.loadFire();
    this.blueFire = this.loadBlueFire();
    


    this.drawHealth = this.drawHealth.bind(this);
    this.drawDamageMeter = this.drawDamageMeter.bind(this);
    this.loadFire = this.loadFire.bind(this);
    this.loadBlueFire = this.loadBlueFire.bind(this);
    this.drawHUD = this.drawHUD.bind(this);
    this.drawAmmo = this.drawAmmo.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
  }

  loadFire() {
    let img = new Image();
    img.src = "./assets/fireball.png";
    return img;
  }
  loadBlueFire() {
    let img = new Image();
    img.src = "./assets/blue_fireball.png";
    return img;
  }



  drawHUD(canvas, ctx, player, frameCount, points) {
    ctx.beginPath();
    ctx.rect(0, (canvas.height - 55), canvas.width, 55);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    this.drawHealth(canvas, ctx, player);
    this.drawDamageMeter(canvas, ctx, player);
    this.drawPoints(ctx, canvas, points)
    this.drawAmmo(canvas, ctx, player, frameCount);
  }


  drawHealth(canvas, ctx, player) {

    let healthMeter = ((canvas.width / 2) * (player.health / 200));

    ctx.beginPath();
    ctx.rect(150, (canvas.height - 40), (canvas.width / 2), 20);
    ctx.fillStyle = "rgba(255, 255, 255, .1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(150, (canvas.height - 40), (healthMeter), 20);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  drawDamageMeter(canvas, ctx, player) {

    let damageMeter = ((canvas.width / 2) * (player.damageMeter / 100));

    ctx.beginPath();
    ctx.rect(150, (canvas.height - 15), (canvas.width / 2), 7);
    ctx.fillStyle = "rgba(255, 255, 255, .1)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(150, (canvas.height - 15), (damageMeter), 7);
    ctx.fillStyle = "rgb(0, 157, 255)";
    ctx.fill();
    ctx.closePath();
  }

  drawAmmo(canvas, ctx, player, frameCount) {
    if (!player.damageBoost) {

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
            (frameCount % 8) * 43 + ((frameCount % 8) + 1) * 21,
            400,
            22,
            35,
            canvas.width - 170,
            canvas.height - 50,
            40,
            40
          );
        case 1:
          ctx.drawImage(
            this.fire,
            (frameCount % 8) * 43 + ((frameCount % 8) + 1) * 21,
            400,
            22,
            35,
            canvas.width - 120,
            canvas.height - 50,
            40,
            40
          );
        case 2:
          ctx.drawImage(
            this.fire,
            (frameCount % 8) * 43 + ((frameCount % 8) + 1) * 21,
            400,
            22,
            35,
            canvas.width - 70,
            canvas.height - 50,
            40,
            40
          );
        default:
          break;
      }
    } else {
      ctx.drawImage(
        this.blueFire,
        (frameCount % 8) * 43 + ((frameCount % 8) + 1) * 21,
        400,
        22,
        35,
        canvas.width - 150,
        canvas.height - 60,
        70,
        60
      );
    }


  }

  drawPoints(ctx, canvas, points) {
        ctx.font = "20px Arial";
        // ctx.fillStyle = "rgb(46, 2, 2)";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(
          `Score: ${points}`,
          20,
          canvas.height - 25
        );

  }

}

export default GameHUD;