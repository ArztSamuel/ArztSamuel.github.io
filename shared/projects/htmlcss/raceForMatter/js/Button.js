/*
	// Race for Matter - Button \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/


function Button(initTxt, resizeFunction, canvWidth, canvHeight){
	var txt = initTxt;
	var x = 0;
	var y = 0;
	var width = 0;
	var height = 0;
	var color = 'fireBrick';
	
	this.resize = function(canvWidth, canvHeight){
		var values = resizeFunction(canvWidth, canvHeight);
		x = values[0];
		y = values[1];
		width = values[2];
		height = values[3];
	};
	
	this.resize(canvWidth, canvHeight);
	
	this.update = function(timeSinceLastFrame){
		
	};
	
	this.draw = function(g){
		g.fillStyle = color;
		g.lineWidth = 1;
		g.fillRect(x, y, width, height);
		g.strokeStyle = 'black';
		g.strokeRect(x+1, y+1, width-2, height-2); //Border
		
		g.fillStyle = 'black';
		g.font = height/2 + "px Arial";
		var textBounds = g.measureText(txt);
		g.fillText(txt, x + (width - textBounds.width)/2, y + (5*height)/8);
	};
	
	
	this.clicked = function(mouseX, mouseY){};
	
	
	this.isInElement = function(xPos, yPos){
		return (xPos > x && xPos < (x + width) && yPos > y && yPos < (y + height));
	};
}