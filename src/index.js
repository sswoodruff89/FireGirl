import "./styles/index.scss";
// import * as firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import firebaseConfig from "../config/firebase";
import firebase from "firebase/app";
import "firebase/database";
import GameView from "./GameView";

// const greeting = testObj?.key2?.key3 || testObj.key1;
window.addEventListener("DOMContentLoaded", () => {
  
  firebase.initializeApp(firebaseConfig);

  const leaderboard = firebase.database()
    .ref("leaderboard")
    .orderByChild("score")
    .limitToLast(10);

  console.log(leaderboard);
  const scores = document.getElementById("leaderboard");

  leaderboard.on("child_added", (obj) => {
    const li = document.createElement('li');
    li.innerText = `${obj.val().name}: ${obj.val().score}`;
    li.value = obj.val().score;
    scores.appendChild(li);
   } 
  );



  let canvas = document.getElementById("gameCanvas");
  let ctx = canvas.getContext("2d");
  let gameView = new GameView(canvas, ctx);

  gameView.renderGame();


  

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
