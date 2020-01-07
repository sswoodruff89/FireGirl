import Controller from "./util/Controller";
import Player from "./Player";

class GameView {
  constructor () {
    this.stage = new createjs.Stage("gameCanvas");
    this.circle = new createjs.Shape();
    this.player = new Player();
    this.playerModel = this.player.model;
    this.controller = new Controller(this.player);

    this.circle.graphics.beginFill("blue").drawRect(0, 0, 40, 70);
    //Set position of Shape instance.
    this.circle.x = this.circle.y = 50;
    //Add Shape instance to stage display list.
    this.stage.addChild(this.circle);
    this.stage.addChild(this.playerModel);
    //Update stage will render next frame
    this.stage.update();

    this.handleTick = this.handleTick.bind(this);
    
    createjs.Ticker.framerate = 40;
    createjs.Ticker.on("tick", this.handleTick);

    // function handleTick(event) {
    //   //Circle will move 10 units to the right.
    //   circle.x += event.delta / 1000 * 100;

    //   //Will cause the circle to wrap back
    //   if (circle.x > stage.canvas.width) { circle.x = 0; }
    //   stage.update();
    // }
  }
  
  handleTick(event) {
    this.player.move();
    //Circle will move 10 units to the right.
    // circle.x += event.delta/1000*100;

    //Will cause the circle to wrap back
    // if (this.circle.x > this.stage.canvas.width) { this.circle.x = 0; }
    // if (this.circle.x < 0) { this.circle.x = this.stage.canvas.width; }
    // if (this.circle.y < 0) { this.circle.y = this.stage.canvas.height; }
    // if (this.circle.y > this.stage.canvas.height) { this.circle.y = 0; }
    if (this.playerModel.x > this.stage.canvas.width) { this.playerModel.x = 0; }
    if (this.playerModel.x < 0) { this.playerModel.x = this.stage.canvas.width; }
    if (this.playerModel.y < 0) { this.playerModel.y = this.stage.canvas.height; }
    if (this.playerModel.y > this.stage.canvas.height) { this.playerModel.y = 0; }
    this.stage.update();
  }



} 

export default GameView;

