/*
THANKS FOR CHECKING OUT my CLICKMASTER GAME. This is my first time making an actual game in Javascript. 
Please enjoy and have fun! 
www.instagram.com/957wayne

- Wayne Ruan (June 1st, 2018)
*/

//clickmaster game layout
class line {
    constructor (x1, y1, x2, y2) {
		ctx.strokeStyle= 'white';
        this.og = y1
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
		ctx.beginPath();
        ctx.moveTo(this.x1, this.og);
        ctx.lineTo(this.x2, this.og)
        ctx.stroke();
        var i;
        for (i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.moveTo(this.x1, i*100);
            ctx.lineTo(this.x2, i*100)
            ctx.stroke();
        }
		var j;
		for (j = 0; j < 5; j++) {
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.moveTo(j*100, 0);
            ctx.lineTo(j*100, height)
            ctx.stroke();
        }
    }
}

//creating the red blocks and the black blocks within the game
class square {
    constructor (x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.color = color; 
		this.activate = false
		this.number = 0;
		this.og = this.number;
		this.rando = Math.random()*(100);
		this.already = false;
		// if (this.activate) {
			// ctx.fillStyle=  this.color;
			// ctx.fillRect(this.x, this.y, this.w, this.h)
		// }		
    }
	move() {
		if (this.activate) {
			ctx.fillStyle=  this.color;
			ctx.fillRect(this.x, this.y, this.w, this.h)
		}
		if (this.activate == false) {
			ctx.fillStyle=  'black';
			ctx.fillRect(this.x, this.y, this.w, this.h)			
		}
	}
}

//get mouse location
function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
		};
}

//provide a random number that determine which square will randomly occur.
function getRandomNumber() {
		return Math.floor(Math.random()*(25));
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
const height = 500
const width = 500
//contains the 25 squares.
var grid = []
var i  = 0;
var intervaltime = 100

//creating the 25 squares on board.
for (y=0; y < 5; y++) {
	for (x=0; x < 5; x++) {
			i++;
			let nexus = new square(x*100, y*100, 100, 100,'red');
			nexus.number = i;
			grid.push(nexus);
	}
}

function startGame() {
	
	setInterval(updateGameArea, intervaltime);	
	

	canvas.addEventListener('mousedown', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		// console.log(infinitelevel + 'x: ' + mousePos.x);
		if (mainscreen == true &&
			mousePos.x > grid[12].x &&
			mousePos.x < grid[12].x+grid[12].w &&
			mousePos.y > grid[12].y &&
			mousePos.y < grid[12].y+grid[12].h) {
					grid[12].activate = true;
					grid[12].move();
					mainscreen = false;
					instruction = true;
					countdown = false;
					
		}
	
		if (infinitelevel == true &&
			mousePos.x > 205 &&
			mousePos.x < 300 &&
			mousePos.y > 400 &&
			mousePos.y < 439 ) {
					console.log('working')
					mainscreen = false;
					infiniteactivate = true;
					ending = false;
					score1 = false;
					
		}
		
		if (mainscreen == false &&
			instruction == true &&
			mousePos.x > width/3 &&
			mousePos.x < width/3+188 &&
			mousePos.y > height/1.35 &&
			mousePos.y < height/1.35+103) {
					tile = 0	
					tile2 = 0;
					instruction = false;
					timer = 0;
					countdown = true;
					score1 = false;
			}
			
			
		if (mainscreen == false &&
			instruction == false &&
			countdown == false &&
			levelone == true) {
				// for (p = 0; p < 25; p++) {
					var mousePos = getMousePos(canvas, evt);
					if (mousePos.x > grid[tile].x && 
						mousePos.x < grid[tile].x+100 &&
						mousePos.y > grid[tile].y &&
						mousePos.y < grid[tile].y+100 ) {
						// console.log(grid[tile].number + ' and ' + grid[tile].activate);
						grid[tile].activate = false;
						grid[tile].move();
						levelone = false;
						victorywindow = true;
						progress = 1;
						score1 = false;
					}
				// }				
			}
			
		if (mainscreen == false &&
			instruction == false &&
			countdown == false &&
			leveltwo == true) {
					var mousePos = getMousePos(canvas, evt);
					if (mousePos.x > grid[tile].x && 
						mousePos.x < grid[tile].x+100 &&
						mousePos.y > grid[tile].y &&
						mousePos.y < grid[tile].y+100 ) {
						// console.log(grid[tile].number + ' and ' + grid[tile].activate);
						grid[tile].activate = false;
						grid[tile].move();
						freeze = true;
					}
					if (mousePos.x > grid[tile2].x && 
						mousePos.x < grid[tile2].x+100 &&
						mousePos.y > grid[tile2].y &&
						mousePos.y < grid[tile2].y+100 ) {
						// console.log(grid[tile2].number + ' and ' + grid[tile2].activate);
						grid[tile2].activate = false;
						grid[tile2].move();
						freeze2 = true;
					}			
			}
			
		if (mainscreen == false &&
			instruction == false &&
			countdown == false &&
			levelthree == true) {
					// console.log(deathclick)
				
					var mousePos = getMousePos(canvas, evt);
					if (mousePos.x > grid[outertile].x && 
						mousePos.x < grid[outertile].x+100 &&
						mousePos.y > grid[outertile].y &&
						mousePos.y < grid[outertile].y+100 ) {
						// console.log(grid[outertile].number + ' and ' + grid[outertile].activate);
						grid[outertile].activate = false;
						grid[outertile].move();
						freezeout = false;
					}
					
					
					if (((mousePos.x < grid[outertile].x || mousePos.x > grid[outertile].x+100) ||
						(mousePos.y < grid[outertile].y || mousePos.y > grid[outertile].y+100))
						&& freezein != true && freezeout == true) {
							// console.log('ready')
							grid[innertile].activate = true;
							freezein = true;
						}				

					if (mousePos.x > grid[innertile].x && 
						mousePos.x < grid[innertile].x+100 &&
						mousePos.y > grid[innertile].y &&
						mousePos.y < grid[innertile].y+100 && 
						freezein == true) {
						// console.log(grid[innertile].number + ' and ' + grid[innertile].activate);
						grid[innertile].activate = false;
						grid[innertile].move();
						freezein = false;
						// freeze = true;
					}						
						
					
					if (((mousePos.x < grid[innertile].x || mousePos.x > grid[innertile].x+100) ||
						(mousePos.y < grid[innertile].y || mousePos.y > grid[innertile].y+100))
						&& freezeout != true
						&& freezein == true) {
							grid[outertile].activate = true;
							freezeout = true;
						}
						
					if (((mousePos.x < grid[innertile].x || mousePos.x > grid[innertile].x+100) ||
						(mousePos.y < grid[innertile].y || mousePos.y > grid[innertile].y+100))
						&& freezein == true) {
							deathclick++;
					}
		
			
		}
			
		if (victorywindow == true) {
			timer = 0;
			var mousePos = getMousePos(canvas, evt);
			if (mousePos.x > 110 && 
						mousePos.x < 200 &&
						mousePos.y > 300 &&
						mousePos.y < 339) {
						tile = 0	
						tile2 = 0;
						grid[12].activate = false;
						victorywindow = false;
						timer = 0;
						countdown = true;
					} else if (mousePos.x > 280 &&
								mousePos.x < 370 &&
								mousePos.y > 300 &&
								mousePos.y < 339) {
									grid[tile].activate = false;
									grid[tile2].activate = false;
									tile = 0
									tile2 = 0;
									for (p = 0; p < 1; p++) {
										grid[p].activate = true;
									}	
									grid[12].activate = false;
									victorywindow = false;
									progress = 0;
									mainscreen = true;
								}
		}
			
		if (defeatscreen == true) {
			timer = 0;
			var mousePos = getMousePos(canvas, evt);
			if (mousePos.x > 110 && 
						mousePos.x < 200 &&
						mousePos.y > 300 &&
						mousePos.y < 339) {
						tile = 0	
						tile2 = 0;	
						grid[12].activate = false;
						defeatscreen = false;
						freeze = false;
						freeze2 = false;
						countdown = true;
						grid[tile].activate = true;
					} else if (mousePos.x > 280 &&
								mousePos.x < 370 &&
								mousePos.y > 300 &&
								mousePos.y < 339) {
									tile = 0	
									tile2 = 0;
									grid[12].activate = false;
									defeatscreen = false;
									mainscreen = true;
									freeze = false;
									freeze2 = false;
									progress = 0;
									deathclick = 0;
									grid[tile].activate = true;
									
								}
		}
		
		if (ending == true) {
			timer = 0;
			var mousePos = getMousePos(canvas, evt);
			if (mousePos.x > 200 &&
								mousePos.x < 290 &&
								mousePos.y > 300 &&
								mousePos.y < 339) {
									for (p = 1; p < 24; p++) {
											grid[p].activate = false;
											grid[p].move();
									}
									tile = 0	
									tile2 = 0;
									grid[tile].activate = true;
									grid[12].activate = false;
									defeatscreen = false;
									mainscreen = true;
									freeze = false;
									freeze2 = false;
									levelone = false;
									leveltwo = false
									levelthree = false;
									progress = 0;
									deathclick = 0;
									grid[tile].activate = true;
									infinitelevel = true;
									ending = false;
									freezeout = true;
									freezein = false;
									score1 = false;
								}
		}
		
		if (infiniteactivate == true) {
				console.log(click);
				for (p = 0; p < 25; p++) {
					var mousePos = getMousePos(canvas, evt);
					if (mousePos.x > grid[p].x && 
						mousePos.x < grid[p].x+100 &&
						mousePos.y > grid[p].y &&
						mousePos.y < grid[p].y+100 &&
						grid[p].activate == true) {
						// console.log(grid[tile].number + ' and ' + grid[tile].activate);
						grid[p].activate = false;
						grid[p].move();
						click++;
						// progress = 1;
					}
				}				
			}
			
		if (score1) {
			timer = 0;
			var mousePos = getMousePos(canvas, evt);
			if (mousePos.x > 200 &&
								mousePos.x < 290 &&
								mousePos.y > 310 &&
								mousePos.y < 349) {
									tile = 0	
									tile2 = 0;
									grid[12].activate = false;
									defeatscreen = false;
									mainscreen = true;
									freeze = false;
									freeze2 = false;
									progress = 0;
									deathclick = 0;
									click = 0;
									grid[tile].activate = true;
									infinitelevel = true;
									score1 = false;
									for (p = 0; p < 25; p++) {
											grid[p].activate = false;
											grid[p].move();
									}	
								}			
		}
			
	}, false);	
	


	

	titlescreen = new Image();
	titlescreen.src = 'titlescreen.png';
		
	home = new Image();
	home.src = 'home.png';
	
	play = new Image();
	play.src = 'play.png';
	
	ready = new Image();
	ready.src = 'ready.png';
	
	one = new Image();
	one.src = '1.png';
	
	two = new Image();
	two.src = '2.png';
	
	three = new Image();
	three.src = '3.png';
	
	gameover = new Image();
	gameover.src = 'gameover.png';
	
	youwon = new Image();
	youwon.src = 'youwon.png';
	
	yes = new Image();
	yes.src = 'yes.png';
	
	no = new Image();
	no.src = 'no.png'

	endscreen = new Image();
	endscreen.src = 'endscreen.png';
	
	returntomenu = new Image();
	returntomenu.src = 'returntomenu.png';

	infinitelevels = new Image();
	infinitelevels.src = 'infinitelevel.png';
	
	youslain = new Image();
	youslain.src = 'youslain.png';
}

//let the first square be turned on for level one.		
for (p = 0; p < 1; p++) {
		grid[p].activate = true;
}	
	
//sequence of the game
var mainscreen = true;
var instruction = false;
var countdown = false;
var levelone = false;
var leveltwo = false;
var levelthree = false;
var victorywindow = false;
var defeatscreen = false;
var ending = false;

//activate the bonus round
var infinitelevel = false;
var infiniteactivate = false;
//reveal how much squares you killed.
var score1 = false;

var timer = 0;

//infinite challenge (count how many squares you killed).
var click = 0;

//leveltwo's square's movement. (freeze help determine whether a square is killed or not).
var tile = 0;
var tile2 = 0;
var freeze = false;
var freeze2 = false;

//levelthree square work similarly to leveltwo's square but they have effect on one another.
var outertile = 0;
var innertile = 6;
var freezeout = true;
var freezein = false;

//how far in are you in the game.
var progress = 0;

//in level three, you have to be careful about how you play because you can't click rapidly like in previous levels.
var deathclick = 0;

//where the magic happens. the stuff inside is triggered by the true false booleans above.
function updateGameArea() {	
	var random = getRandomNumber();
	
	//starting screen
	if (mainscreen == true && countdown == false && instruction == false) {
			console.log('main menu')
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)
			
			ctx.font = "20px Arial";
			ctx.fillStyle = "yellow";
			ctx.fillText("Click the center to continue", width/3.5, height/1.5);	

			let x = new line(-10, -10, width, height)
			ctx.drawImage(home, width/2.25, height/2.25, width*.1, height*.1)	
	
	

			ctx.font = "65px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("CLICKMASTER", width/15, height/3);		


			ctx.font = "65px Arial";
			ctx.fillStyle = "yellow";
			ctx.fillText("PLAY", width/15, height/6);
			
			if (infinitelevel) {
				ctx.drawImage(infinitelevels, 205, 400);
			}
	}
	
	//instruction page
	if (mainscreen == false && instruction == true && countdown == false) {
			console.log('instruction')
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)
			
			ctx.font = "65px serif";
			ctx.fillStyle = "white";
			ctx.fillText("HOW TO PLAY?", width/17, height/10);
			
			ctx.font = "30px arial";
			ctx.fillStyle = "yellow";
			ctx.fillText("Doubleclick the red square to win,", width/17, height/2.5);
			
			ctx.font = "30px arial";
			ctx.fillStyle = "red";
			ctx.fillText("before it hits the house.", width/2.75, height/2);
			
			ctx.drawImage(play, width/3, height/1.35);
		

		
	}
	
	//ready page
	if (countdown == true && instruction == false && mainscreen == false) {
			score1 = false;
			console.log('countdown')
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)
	
			grid[0].activate = true;
			grid[0].move();
			
			let x = new line(-10, -10, width, height)
			ctx.drawImage(home, width/2.25, height/2.25, width*.1, height*.1)
			
			
			ctx.drawImage(ready, 175, 105);
			
			timer++;
			// console.log(timer)
			
			if (progress == 0) {
				if (timer > 0) {
					ctx.drawImage(three, 100, 300);
					
				}
				if (timer > 5) {
					ctx.drawImage(two, 200, 300);
				}
				if (timer > 10) {
					ctx.drawImage(one, 300, 300);
				}
				if (timer > 15) {
						countdown = false;
						levelone = true;
						
						
				}
			}
			if (progress == 1) {
				if (timer > 0) {
					ctx.drawImage(three, 100, 300);
				}
				if (timer > 5) {
					ctx.drawImage(two, 200, 300);
				}
				if (timer > 10) {
					ctx.drawImage(one, 300, 300);
				}
				if (timer > 15) {
						countdown = false;
						leveltwo = true;
						
				}				
			}
			
			if (progress == 2) {
				if (timer > 0) {
					ctx.drawImage(three, 100, 300);
				}
				if (timer > 5) {
					ctx.drawImage(two, 200, 300);
				}
				if (timer > 10) {
					ctx.drawImage(one, 300, 300);
				}
				if (timer > 15) {
						deathclick = 0
						outertile = 0;
						innertile = 6;
						freezeout = true;
						freezein = false;						
						countdown = false;
						levelthree = true;
						
				}				
			}
	}
	
	if (levelone == true && countdown == false && mainscreen == false && instruction == false) {
					score1 = false;
			console.log('Level one')
			ctx.clearRect(0, 0, width, height)
			
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)	
			

			if (grid[tile].activate == true &&
				(tile == 0 || tile == 5 || tile == 10 || tile == 15)) {
				grid[tile].activate = false;
				tile += 5;
				grid[tile].activate = true;
				grid[tile].move();
			}
			
			 else if (grid[tile].activate == true && 
					(tile == 20 || tile == 21 || tile == 22 || tile == 23)) {
				grid[tile].activate = false;
				tile += 1;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 24 || tile == 19 || tile == 14 || tile == 9)) {
				grid[tile].activate = false;
				tile -= 5;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 4 || tile == 3 || tile == 2)) {
				grid[tile].activate = false;
				tile -= 1;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 1 || tile == 6 || tile == 11)) {
				grid[tile].activate = false;
				tile += 5;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 16 || tile == 17)) {
				grid[tile].activate = false;
				tile += 1;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 18 || tile == 13)) {
				grid[tile].activate = false;
				tile -= 5;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 8)) {
				grid[tile].activate = false;
				tile -= 1;
				grid[tile].activate = true;
				grid[tile].move();
			 }
			 
			 else if (grid[tile].activate == true && 
					(tile == 7)) {
				grid[tile].activate = false;
				tile += 5;
				grid[tile].activate = true;
				grid[tile].move();
			 }

			else if (grid[tile].activate = true && tile == 12) {
				levelone = false;
				defeatscreen = true;
			}

			let x = new line(-10, -10, width, height)
			ctx.drawImage(home, width/2.25, height/2.25, width*.1, height*.1)
			
	}
	
	if (leveltwo == true) {
			score1 = false;
			console.log('level two')
			ctx.clearRect(0, 0, width, height)
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)	
		
		if (freeze2 == false) {
			if (grid[tile2].activate == true &&
				(tile2 == 0 || tile2 == 1 || tile2 == 2 || tile2 == 3)) {
				grid[tile2].activate = false;
				tile2 += 1;
				grid[tile2].activate = true;
				grid[tile2].move();
			}else if (grid[tile2].activate == true && 
					(tile2 == 4 || tile2 == 9 || tile2 == 14 || tile2 == 19)) {
					grid[tile2].activate = false;
					tile2 += 5;
					grid[tile2].activate = true;
					grid[tile2].move();
			 } else if (grid[tile2].activate == true && (tile2 == 24 || tile2 == 23 || tile2 == 22 || tile2 == 21)) {
				grid[tile2].activate = false;
				tile2 -= 1;
				grid[tile2].activate = true;
				grid[tile2].move();
			 }else if (grid[tile2].activate == true && 
					(tile2 == 20 || tile2 == 15 || tile2 == 10)) {
				grid[tile2].activate = false;
				tile2 -= 5;
				grid[tile2].activate = true;
				grid[tile2].move();
			 }else if (grid[tile2].activate == true && 
					(tile2 == 5 || tile2 == 6 || tile2 == 7)) {
				grid[tile2].activate = false;
				tile2 += 1;
				grid[tile2].activate = true;
				grid[tile2].move();
			 }else if (grid[tile2].activate == true && 
					(tile2 == 8 || tile2 == 13)) {
				grid[tile2].activate = false;
				tile2 += 5;
				grid[tile2].activate = true;
				grid[tile2].move();
			 }else if (grid[tile2].activate == true && 
					(tile2 == 18 || tile2 == 17)) {
				grid[tile2].activate = false;
				tile2 -= 1;
				grid[tile2].activate = true;
				grid[tile2].move();
			 } else if (grid[tile2].activate == true && 
					(tile2 == 16)) {
				grid[tile2].activate = false;
				tile2 -= 5;
				grid[tile2].activate = true;
				grid[tile2].move();
			 } else if (grid[tile2].activate == true && 
					(tile2 == 11)) {
				grid[tile2].activate = false;
				tile2 += 1;
				grid[tile2].activate = true;
				grid[tile2].move();
			 }	
		}

		if (freeze == false) {	
			if ((tile == 0 || tile == 5 || tile == 10 || tile == 15)) {
				grid[tile].activate = false;
				tile += 5;
				grid[tile].activate = true;
				grid[tile].move();
			} else if ((tile == 20 || tile == 21 || tile == 22 || tile == 23)) {
				grid[tile].activate = false;
				tile += 1;
				grid[tile].activate = true;
				grid[tile].move();
			 } else if ((tile == 24 || tile == 19 || tile == 14 || tile == 9)) {
				grid[tile].activate = false;
				tile -= 5;
				grid[tile].activate = true;
				grid[tile].move();
			 } else if ((tile == 4 || tile == 3 || tile == 2)) {
				grid[tile].activate = false;
				tile -= 1;
				grid[tile].activate = true;
				grid[tile].move();
			 } else if ((tile == 1 || tile == 6 || tile == 11)) {
				grid[tile].activate = false;
				tile += 5;
				grid[tile].activate = true;
				grid[tile].move();
			 } else if ((tile == 16 || tile == 17)) {
				grid[tile].activate = false;
				tile += 1;
				grid[tile].activate = true;
				grid[tile].move();
			 }else if ((tile == 18 || tile == 13)) {
				grid[tile].activate = false;
				tile -= 5;
				grid[tile].activate = true;
				grid[tile].move();
			 }else if ((tile == 8)) {
				grid[tile].activate = false;
				tile -= 1;
				grid[tile].activate = true;
				grid[tile].move();
			 } else if ((tile == 7)) {
				grid[tile].activate = false;
				tile += 5;
				grid[tile].activate = true;
				grid[tile].move();
			 }	
				
		}
		
			if (tile2 == 12 || tile == 12) {
				leveltwo = false;
				defeatscreen = true;
			}	

			if (freeze == true && freeze2 == true) {
					leveltwo = false;
					victorywindow = true;
					progress = 2;
			}
			 
			
			let x = new line(-10, -10, width, height)
			ctx.drawImage(home, width/2.25, height/2.25, width*.1, height*.1)			
	}
	
	if (levelthree == true && mainscreen == false && countdown == false && instruction == false) {
			score1 = false;
			console.log('level three')
			ctx.clearRect(0, 0, width, height)
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)	

			if (freezeout) {
				if (grid[outertile].activate == true &&
					(outertile == 0 || outertile == 1 || outertile == 2 || outertile == 3)) {
						grid[outertile].activate = false;
						outertile += 1;
						grid[outertile].activate = true;
						grid[outertile].move();			
					}else if (grid[outertile].activate == true &&
					(outertile == 4 || outertile == 9 || outertile == 14 || outertile == 19)) {
						grid[outertile].activate = false;
						outertile += 5;
						grid[outertile].activate = true;
						grid[outertile].move();			
					}else if (grid[outertile].activate == true &&
					(outertile == 24 || outertile == 23 || outertile == 22 || outertile == 21)) {
						grid[outertile].activate = false;
						outertile -= 1;
						grid[outertile].activate = true;
						grid[outertile].move();			
					}else if (grid[outertile].activate == true &&
					(outertile == 20 || outertile == 15 || outertile == 10 || outertile == 5)) {
						grid[outertile].activate = false;
						outertile -= 5;
						grid[outertile].activate = true;
						grid[outertile].move();			
					}
			}
			
			if (freezein) {
				if (grid[innertile].activate == true && 
					(innertile == 6 || innertile == 7)) {
						grid[innertile].activate = false;
						innertile += 1;
						grid[innertile].activate = true;
						grid[innertile].move();		
					} else if (grid[innertile].activate == true && 
						(innertile == 8 || innertile == 13)) {
							grid[innertile].activate = false;
							innertile += 5;
							grid[innertile].activate = true;
							grid[innertile].move();		
					} else if (grid[innertile].activate == true && 
						(innertile == 18 || innertile == 17)) {
							grid[innertile].activate = false;
							innertile -= 1;
							grid[innertile].activate = true;
							grid[innertile].move();		
					} else if (grid[innertile].activate == true && 
						(innertile == 16 || innertile == 11)) {
							grid[innertile].activate = false;
							innertile -= 5;
							grid[innertile].activate = true;
							grid[innertile].move();		
					}
			}
			
			if (freezeout == false && freezein == false) {
				ending = true;
			}
			
			if (deathclick >= 3 && freezeout == true && freezein == true) {
				levelthree = false;
				defeatscreen = true;
			}
			
			let x = new line(-10, -10, width, height)
			ctx.drawImage(home, width/2.25, height/2.25, width*.1, height*.1)	
	}
	
	if (victorywindow == true && (levelone == false || leveltwo == false || levelthree == false)) {
			console.log('victory')
			ctx.drawImage(youwon, 75, 150)
			ctx.drawImage(yes, 110, 300)
			ctx.drawImage(no, 280, 300)
	}
	
	if (defeatscreen == true) {
			ctx.drawImage(gameover, 75, 150)
			ctx.drawImage(yes, 110, 300)
			ctx.drawImage(no, 280, 300)
	}
	
	if (ending == true) {
			// levelthree = false;
			ctx.drawImage(endscreen, 75, 150)
			ctx.drawImage(returntomenu, 200, 300);
	}
	
	if (infiniteactivate == true && mainscreen == false && leveltwo == false && levelone == false && levelthree == false) {
		
			ctx.clearRect(0, 0, width, height)
			ctx.fillStyle= 'black';
			ctx.fillRect(0, 0, width, height)
			
			
			let rando = getRandomNumber();
			
			for (p = 0; p < 25; p++) {
					grid[p].move();
			}				
			

			if (grid[rando].activate == false) {
						grid[rando].activate = true;
						// grid[rando].already = true;
						// grid[rando].move();
			}	

			if (grid[12].activate == true) {
					infiniteactivate = false; 
					score1 = true;
			}
			
			let x = new line(-10, -10, width, height)
			ctx.drawImage(home, width/2.25, height/2.25, width*.1, height*.1)	
	}
	
	if (score1 == true && mainscreen == false && leveltwo == false && levelone == false && levelthree == false && countdown == false) {
			ctx.drawImage(youslain, 75, 150)
			ctx.font = "65px Arial";
			ctx.fillStyle = "red";
			ctx.fillText(click, 75, 300);
			ctx.drawImage(returntomenu, 200, 310);
	}
	
	
}