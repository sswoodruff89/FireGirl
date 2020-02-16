import "./styles/index.scss";

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

  const scores = document.getElementById("leaderboard");

  while (scores.firstChild) {
    scores.removeChild(scores.firstChild);
  }

  leaderboard.on("child_added", (obj) => {
      const li = document.createElement('li');
      li.innerText = `${obj.val().name}: ${obj.val().score}`;
      li.setAttribute("data-score", obj.val().score);
      scores.insertBefore(li, scores.firstChild)
   } 
  );

  let scoreRef = firebase.database().ref("leaderboard");



  let canvas = document.getElementById("gameCanvas");
  let ctx = canvas.getContext("2d");
  let gameView = new GameView(canvas, ctx, scoreRef);

  gameView.renderGame();

});
