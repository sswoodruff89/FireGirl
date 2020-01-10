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
  // img.src = "./assets/firegirl.jpg";
  // img.onload = () => {
  //   // ctx.drawImage(img, 0, 0);
  //         ctx.drawImage(
  //         img,
  //         0,
  //         0,
  //         920,
  //         644,
  //         0, 0,
  //         900, 600
  //   );
  // };
  

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



});
