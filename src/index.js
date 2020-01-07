import "./styles/index.scss";
import GameView from "./GameView";

// const greeting = testObj?.key2?.key3 || testObj.key1;
window.addEventListener("DOMContentLoaded", () => {

  let gameView = new GameView();

  // let stage = new createjs.Stage("gameCanvas");
  // //Create a Shape DisplayObject.

  // let circle = new createjs.Shape();
  // circle.graphics.beginFill("red").drawCircle(0, 0, 40);
  // //Set position of Shape instance.
  // circle.x = circle.y = 50;
  // //Add Shape instance to stage display list.
  // stage.addChild(circle);
  // //Update stage will render next frame
  // stage.update();


  // createjs.Ticker.framerate = 40;
  // createjs.Ticker.on("tick", handleTick);

  // function handleTick(event) {
  //   //Circle will move 10 units to the right.
  //   // circle.x += event.delta/1000*100;

  //   //Will cause the circle to wrap back
  //   if (circle.x > stage.canvas.width) { circle.x = 0; }
  //   if (circle.x < 0 ) { circle.x = stage.canvas.width; }
  //   if (circle.y < 0 ) { circle.y = stage.canvas.height; }
  //   if (circle.y > stage.canvas.height ) { circle.y = 0; }
  //   stage.update();
  // }


  // let keys = {
  //   37: 'left',
  //   38: 'up',
  //   39: 'right',
  //   40: 'down',
  //   65: 'jump'
  // };

  // window.addEventListener("keydown", keydown);

  // function keydown(event) {
  //   switch (keys[event.keyCode]) {
  //     case "left":
  //       circle.x -= 10;
  //       break;
  //     case "right":
  //       circle.x += 10;
  //       break;
  //     case "up":
  //       circle.y -= 10;
  //       break;
  //     case "down":
  //       circle.y += 10;
  //       break;
  //     default:
  //       null;
  //   }
  // }

});
