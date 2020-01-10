import "./styles/index.scss";
import GameView from "./GameView";

// const greeting = testObj?.key2?.key3 || testObj.key1;
window.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("gameCanvas");
  let ctx = canvas.getContext("2d");
  let gameView = new GameView(canvas, ctx);

  gameView.renderGame();

  // ctx.beginPath();
  // ctx.rect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(255, 255, 255, .1)";
  // ctx.fill();
  // ctx.closePath();

  // ctx.font = "130px Arial";
  // ctx.fillStyle = "red";
  // ctx.textAlign = "center";
  // ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  // let img = new Image();
  // img.src = "./assets/plant.png";
  // img.onload = () => {
  //   // ctx.drawImage(img, 0, 0);
  //   console.log(img.size);
  //   ctx.drawImage(
  //     img,
  //     255 ,
  //     0,
  //     110,
  //     110,
  //     65,
  //     65,
  //     65,
  //     65
  //   );
  // };
  // 

  // let fromRight = canvas.width - 50;
  // ctx.beginPath();
  // ctx.arc(fromRight, canvas.height - 30, 5, 0, 2 * Math.PI, false);
  // ctx.fillStyle = 'rgba(255, 255, 255, .1)';
  // ctx.fill();
  // ctx.lineWidth = 5;
  // ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
  // ctx.stroke();
  // ctx.closePath();

  // ctx.beginPath();
  // ctx.arc(canvas.width - 80, canvas.height - 30, 5, 0, 2 * Math.PI, false);
  // ctx.fillStyle = 'rgba(255, 255, 255, .1)';
  // ctx.fill();
  // ctx.lineWidth = 5;
  // ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
  // ctx.stroke();
  // ctx.closePath();

  // ctx.beginPath();
  // ctx.arc(canvas.width - 110, canvas.height - 30, 5, 0, 2 * Math.PI, false);
  // ctx.fillStyle = 'rgba(255, 255, 255, .1)';
  // ctx.fill();
  // ctx.lineWidth = 5;
  // ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
  // ctx.stroke();
  // ctx.closePath();
  
  // img.onload = () => {
  //   ctx.drawImage(
  //     img,
  //     22 ,
  //     400,
  //     35,
  //     35,
  //     0, 0,
  //     35, 35
  //   );
  // };

  

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



});
