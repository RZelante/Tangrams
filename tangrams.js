"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-02

      Project to create a drag and drop tangram puzzle
      Author:Ricardo Zelante 
      Date:04/23/2023   

      Filename: tangrams.js
*/

// Reference to the tangram puzzle board
let puzzleBoard = document.getElementById("puzzle");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
let eventX, eventY, tanX, tanY;

// Node list representing the tangram pieces
let tans = document.querySelectorAll("div#puzzle > img");

// Function to rotate a tan by a specified number of degrees
function rotateTan(elem, deg) {
   const obj = window.getComputedStyle(elem, null);
   const matrix = obj.getPropertyValue("transform");
   let angle = 0;
   if (matrix !== "none") {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180/Math.PI));      
   }
   
   if (angle < 0) {
      angle += 360;
  }

  let newAngle = angle + deg;
  elem.style.transform = "rotate(" + newAngle + "deg)";
}

// Added loop to add event listeners to each tangram piece
for (let i = 0; i < tans.length; i++) {
  tans[i].addEventListener("pointerdown", grabTan);
}

function grabTan(e) {
  if (e.shiftKey) {
      rotateTan(e.target, 15);
  } else {
      eventX = e.clientX;
      eventY = e.clientY;
      tanX = parseInt(window.getComputedStyle(e.target).left);
      tanY = parseInt(window.getComputedStyle(e.target).top);
      e.target.style.touchAction = "none";
      zCounter++;
      e.target.style.zIndex = zCounter;

      e.target.addEventListener("pointermove", moveTan);
      e.target.addEventListener("pointerup", dropTan);
  }
}

function moveTan(e) {
  let deltaX = e.clientX - eventX;
  let deltaY = e.clientY - eventY;
  e.target.style.left = tanX + deltaX + 'px';
  e.target.style.top = tanY + deltaY + 'px';
}

function dropTan(e) {
  e.target.removeEventListener("pointermove", moveTan);
  e.target.removeEventListener("pointerup", dropTan);
}



