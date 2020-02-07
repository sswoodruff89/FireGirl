import Enemy from "./Enemy";

import GameObject from "../GameObject";
import Impact from "../Projectiles/Impact";
import Player from "../../Player";
import Vinehead from "./Vinehead";
import Vine from '../Projectiles/Vine';

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class BossVinehead extends Enemy {
  constructor(options) {
    super(options);
    this.player = options.player;
    this.velX = options.velX || 0;
    this.velY = 0;
    this.image = options.image || "./assets/vinehead.png";
    this.enemy = this.loadImage(this.image);
    this.lowHealth = this.loadImage("./assets/vinehead_red.png")
    this.vineNum = 5;

    // this.vines = this.loadImage("../assets/vine.png");
    this.frameNum = options.frameNum || 8;
    this.frameStartX = 0;
    this.frameStartY = 0;
    this.frameWidth = options.frameWidth || 57;
    this.frameHeight = options.frameHeight || 87;
    this.active = true;
    this.opening = false;
    this.impact = [];
    this.playerCheckTimeout = "";
    this.damage = 50;
    this.attacking = false;
    this.charging = false;
    this.frameCount = 0;

    this.points = 50;

    this.impactIdx = 0;

    this.vines = [
      new Vine(Vine.vines1(this, [680, 165])),
      new Vine(Vine.vines1(this, [710, 220])),
      new Vine(Vine.vines1(this, [680, 435])),
      new Vine(Vine.vines1(this, [740, 275])),
      new Vine(Vine.vines1(this, [740, 325])),
      new Vine(Vine.vines1(this, [710, 380])),
      // new Vine(Vine.vines1(this, [600, 500])),
    ];
    this.vines2 = [
      new Vine(Vine.vines2(this, [200, 0])),
      new Vine(Vine.vines2(this, [250, 20])),
      new Vine(Vine.vines2(this, [270, 510])),
    ]

    this.drawEnemy = this.drawEnemy.bind(this);

    
    this.callAttack = this.callAttack.bind(this);
    this.charge = this.charge.bind(this);
    this.startFrameCount = this.startFrameCount.bind(this);
    this.shuffleVines = this.shuffleVines.bind(this);
    this.renderVines = this.renderVines.bind(this);
    this.attackVines = this.attackVines.bind(this);
    this.startAttack = this.startAttack.bind(this);

    this.renderExplosion = this.renderExplosion.bind(this);

    this.startFrameCount();
    this.startAttack();
  }

  startFrameCount() {
    this.bossInterval = setInterval(() => {
      this.frameCount++;
    }, 1000 / 30);
    // }, 5000)
  }

  startAttack() {
    this.attackTimeout = setTimeout(() => {
      this.attack();
    }, 1000);

    // setTimeout(() => {
    this.vineInterval = setInterval(() => {

      this.attackVines();
    }, 10000);
  }



  attack() {
    this.attacking = true;
    this.chargeTimeout = setTimeout(() => {
      this.charge();
    }, 2500);
  }

  charge() {
    this.charging = true;
    this.velX = (this.health > 500) ? -10 : -20;
  }


  shuffleVines(vines) {
    for (let i = vines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [vines[i], vines[j]] = [vines[j], vines[i]];
    }
    return vines;
  }

  renderVines(ctx, player) {
    this.vines.forEach((vine, i) => {
      vine.move(ctx, this.frameCount, player);
    });
  }

  renderVines2(ctx, player) {
    this.vines2.forEach((vine, i) => {
      vine.move(ctx, this.frameCount, player);
    });
  }

  attackVines() {
    if (this.dead) {
      clearInterval(this.vineInterval);
      return;
    }
    this.vines.forEach((vine, i) => {
      vine.attack((1500) + i * 300);
    })
    setTimeout(() => {
      this.vines = this.shuffleVines(this.vines);
    }, 5000);
  }

  drawEnemy(ctx, frameCount) {
    this.setDying();
    
    if ((this.isHit || this.dying) && frameCount % 3 === 0) {
      this.renderExplosion(ctx, frameCount);

      return;
    }
    let sprite = (this.health < 500 && frameCount % 2 === 0) ? this.lowHealth : this.enemy;

    let y = ((this.attacking && 
      (this.frameCount % 3 === 0 || this.frameCount % 3 === 1)) ||
      this.charging) ? 87 : this.frameStartY;
    if (this.dir === "right") {
      let count = Math.floor(frameCount / 2.5) % this.frameNum;
      ctx.drawImage(
        sprite,
        (Math.floor(this.frameCount / 1.5) % this.frameNum) * this.frameWidth,
        y,
        this.frameWidth,
        this.frameHeight,
        this.x, this.y,
        this.width, this.height
      );
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(
        sprite,
        (this.frameCount % this.frameNum) * this.frameWidth + this.frameStartX,
        y,
        this.frameWidth,
        this.frameHeight,
        -this.x - this.width, this.y - 30,
        this.width, this.height + 30
      );
      ctx.scale(-1, 1);

    }
    if (this.dying) {
      // this.renderExplosion(ctx);
      this.renderExplosion(ctx , frameCount);
    }
  }





  renderExplosion(ctx, frameCount) {
    if (this.impact.length === 0) return;
    this.impact[0].drawImpact(ctx, frameCount);
    if (this.impact[0].done) {
      let x = (Math.random() * this.width) + this.x + (this.width / 10);
      let y = (Math.random() * this.height) + this.y - (this.height/2);
      this.impact[0] = new Impact(Impact.explosion([x, y]));
    }
  }


  setDying() {
    if (this.health <= 0) {
      this.dying = true;
      // this.setDyingInterval();
      let x = (Math.random() * this.width) + this.x - 10;
      let y = (Math.random() * this.height) + this.y - 40;
      this.impact.push(
        new Impact(Impact.explosion([x, y]))
      );
      // this.setExplosions();
      this.vines.forEach((vine) => {
        clearTimeout(vine.chargeTimeout);
        clearTimeout(vine.vineTimeout);
      })
      this.damage = 0;
      this.velX = 0;
      this.velY = 0;
      clearInterval(this.attackInterval);
      clearInterval(this.vineInterval);
      setTimeout(() => {
        this.dead = true;
        clearInterval(this.startFrameCount);
        // clearInterval(this.dyingInterval);
      }, 5000);
    }
  }

  ////////CPU

  
  backUp() {
    this.charging = false;
    this.velX = 2;
  }

  move(canvas, player, ctx) {
    this.oldX = this.x;
    this.x += this.velX;
    if (this.x < 160) {
      this.x = 160;
      // this.attacking = false;
      this.backUp();
    } else if (this.x > 650) {
      this.velX = 0;
      this.attacking = false;
      this.x = 650;

      this.attackTimeout = setTimeout(() => {
        this.attack();
      }, 7000);
    }

    // this.renderVines2(ctx, player);
    this.renderVines(ctx, player);

  }

  //////



  static boss1(pos, player, dir = "right") {
    return {
      name: "vinehead",
      image: "./assets/vinehead.png",
      frameNum: 8,
      pos: pos,
      width: 245,
      height: 340,
      health: 1800,
      velX: 0,
      dir: "left",
      player: player
    };
  }

}




export default BossVinehead;
