/*
	// Race for Matter - TextBox \\
	\\ A Game by Samuel Arzt     //
	 \\ 		2016		    //
*/


function TextBox(initTxt, resizeFunction, canvWidth, canvHeight){
	var txt = initTxt;
	var x = 0;
	var y = 0;
	var width = 0;
	var height = 0;
	var color = 'green';
	
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
		g.fillRect(x, y, width, height);
		
		g.fillStyle = 'black';
		g.font = height/2 + "px Arial";
		var textBounds = g.measureText(txt);
		g.fillText(txt, x + (width - textBounds.width)/2, y + (5*height)/8);
	};
	
	
	this.setText = function(newText){
		txt = newText;
	}
}