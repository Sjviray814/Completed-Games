let canvas = document.getElementById('canvas');
let ctx= canvas.getContext('2d');
let keyUp = "";
let keyDown = "";
var keysPressed1 = [];
var keysPressed2 = [];
var player1Score = 0;
var player2Score = 0;
var hits = 0;
var ballSpeed = 7;
var player1Up = "KeyW";
var player1Down = "KeyS";

var player2Up = "ArrowUp";
var player2Down = "ArrowDown";

var ballColor ="white";

var player1Color ="blue";
var player2Color ="red";




window.onload=function(){
      doBoth();
  }

document.addEventListener("keydown", e => {
    keyDown = e.code; 
	 if((keyDown == player1Up || keyDown == player1Down) && keysPressed1.length < 1) keysPressed1.push(keyDown);
	 if((keyDown == player2Up || keyDown == player2Down) && keysPressed2.length < 1) keysPressed2.push(keyDown);
    });

document.addEventListener("keyup", e => {
    keyUp = e.code; 
	 if(keyUp == player1Up || keyUp == player1Down) keysPressed1 = [];
	 if(keyUp == player2Up || keyUp == player2Down) keysPressed2 = [];
    });

function create(x, y, width, height, color){
    ctx.fillStyle=color;
    ctx.fillRect(x, y, width, height);
  }

function createBall(x, y, r, color){
      ctx.fillStyle=color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      ctx.fill();
  }  


class Ball{
	constructor(){
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.r = 5;
		this.xSpeed = ((Math.random() -.5) * 6);
		this.ySpeed = ((Math.random() -.5) * 6);
		if(this.xSpeed > 0) this.xSpeed += ballSpeed;
		else{this.xSpeed -= ballSpeed;}
		
		
	}
	
	draw(){
		createBall(this.x, this.y, this.r, ballColor);
	}
	move(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}
}

class Paddle1{
	constructor(x){
		this.x = x;
		this.y = canvas.height/2 - 50;
		this.w = 10;
		this.h = 100;
		this.ySpeed = 0;
	}
	
	draw(){
		create(this.x, this.y, this.w, this.h, player1Color);
	}
	move(){
		if(keysPressed1[0] == player1Up) {
			this.ySpeed = -6;
		}
		else if(keysPressed1[0] == player1Down) {
			this.ySpeed = 6;
		}
		else{
			this.ySpeed = 0;
		}
		this.y += this.ySpeed;
	}
	collisionDetect(){
		if(this.y <= 0){
              this.ySpeed = 0
				 this.y = 1;
          }
          else if (this.y >= canvas.height-this.h){
              this.ySpeed = 0;
				 this.y = canvas.height - this.h - 1;
          }		
	}
}



class Paddle2{
	constructor(x){
		this.x = x;
		this.y = canvas.height/2 - 50;
		this.w = 10;
		this.h = 100;
		this.ySpeed = 0;
	}
	
	draw(){
		create(this.x, this.y, this.w, this.h, player2Color);
	}
	move(){
		if(keysPressed2[0] == player2Up) {
			this.ySpeed = -6;
		}
		else if(keysPressed2[0] == player2Down) {
			this.ySpeed = 6;
		}
		else{
			this.ySpeed = 0;
		}
		this.y += this.ySpeed;
	}
	collisionDetect(){
		if(this.y <= 0){
              this.ySpeed = 0
				 this.y = 1;
          }
          else if (this.y >= canvas.height-this.h){
              this.ySpeed = 0;
				 this.y = canvas.height - this.h - 1;
          }		
	}
}


let ball = new Ball();
let paddle1 = new Paddle1(2);
let paddle2 = new Paddle2(1338);

function doBoth(){
	   ctx.clearRect(0, 0, canvas.width, canvas.height);
      moveEverything();
      drawEverything();
      requestAnimationFrame(doBoth);
      
}

function ballReset(){
	ball.xSpeed = ((Math.random() -.5) * 6);
	ball.ySpeed = ((Math.random() -.5) * 6);
	if(ball.xSpeed > 0) ball.xSpeed += ballSpeed;
	else{ball.xSpeed -= ballSpeed;}
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	hits = 0;
}



function moveEverything(){
	ball.move();
	paddle1.collisionDetect();
	paddle2.collisionDetect();
	paddle1.move();
	paddle2.move();
	
	
	if(ball.x + ball.r >= canvas.width){
		if (ball.y > paddle2.y && ball.y < paddle2.y+paddle2.h){
      
			
		//y speed is random after every hit:	
		//ball.ySpeed = ((Math.random() -.5) * 6);
			
		//control y speed with paddle:	
		if(paddle2.ySpeed > 0){
			ball.ySpeed = ((Math.random()) * 6);	
		}
		else if(paddle2.ySpeed < 0){
			ball.ySpeed = ((Math.random()) * -6);	
		}
		else if(paddle2.ySpeed == 0){
			ball.ySpeed = ((Math.random())-.5 * 6);	
		}
			
	// uncomment this if you want a y speed increase:
		/*
		if(ball.ySpeed > 1) {
			ball.ySpeed++;
		}
		else{
			ball.ySpeed -=1;
		}
		*/
		ball.xSpeed++;
		ball.xSpeed = -ball.xSpeed
      }
		else{
			player1Score++;
			ballReset();
		}
	}
		if(ball.y + ball.r >= canvas.height) ball.ySpeed = -ball.ySpeed;
		if(ball.x - ball.r <= 0) {
			if (ball.y > paddle1.y && ball.y < paddle1.y+paddle1.h){
		//hits++;
		ball.xSpeed -=1;
      ball.xSpeed = -ball.xSpeed
				
			
		// random y speed:		
		//ball.ySpeed = ((Math.random() -.5) * 6);
				
				
		//control y speed with paddle:
		if(paddle1.ySpeed > 0){
			ball.ySpeed = ((Math.random()) * 6);	
		}
		else if(paddle1.ySpeed < 0){
			ball.ySpeed = ((Math.random()) * -6);	
		}
		else if(paddle1.ySpeed == 0){
			ball.ySpeed = ((Math.random())-.5 * 6);	
		}
				
		// uncomment this if you want the y speed to increase after every hit:		
		/*		
		if(ball.ySpeed > 1) {
			ball.ySpeed++;
		}
		else{
			ball.ySpeed -=1;
		}
		*/

		//if(hits >= 10) ballReset();
      }
		else{
			player2Score++;
			ballReset();
		}
		}
		if(ball.y - ball.r <= 0) ball.ySpeed = - ball.ySpeed;
	
	
        
}

    
function drawEverything(){
	ball.draw();
	paddle1.draw();
	paddle2.draw();
	
    ctx.font='40px serif'
	ctx.fillStyle=player2Color;
	ctx.fillText(player2Score, 1100, 100);
	 ctx.fillStyle=player1Color;
    ctx.fillText(player1Score, 250, 100);
    
	//ctx.fillText(hits, 670, 100);
	//console.log(keyDown);
}