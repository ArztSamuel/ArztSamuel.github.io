/*
	// Race for Matter - Map  \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/

var map;

function Map(gameCanvas){
	this.xOff = 0;
	this.yOff = 0;
	this.zoom = 1;
	this.curFocus = undefined;
	this.canvas = gameCanvas;
	
	this.MOVESPEED = 150;
	
	
	this.focus = function(){
		if(map.curFocus != undefined){
			map.xOff = map.canvas.width/2 - (map.zoom * map.curFocus.getX());
			map.yOff = map.canvas.height/2 - (map.zoom * map.curFocus.getY());
		}
	}
};

Map.init = function(canvas){
	map = new Map(canvas);
};

Map.getZoom = function(){
	return map.zoom;
};

Map.resetZoom = function(){
	map.zoom = 1;
};

Map.resetOffset = function(){
	map.xOff = 0;
	map.yOff = 0;
}

Map.getXOff = function(){
	return map.xOff;
};

Map.getYOff = function(){
	return map.yOff;
};

Map.incrXOff = function(incr){
	map.xOff += incr;
};

Map.incrYOff = function(incr){
	map.yOff += incr;
};

Map.zoomIn = function(){
	map.zoom *= 2;
	if(map.zoom>16){
		map.zoom = 16;
	}
	//Center cam
	var w2 = map.canvas.width/2;
	var h2 = map.canvas.height/2;
	var oldZoom = map.zoom / 2;
	map.xOff = w2 - map.zoom * ((w2 - map.xOff)/oldZoom);
	map.yOff = h2 - map.zoom * ((h2 - map.yOff)/oldZoom);
};

Map.zoomOut = function(){
	if(map.zoom/2 != 0){
		map.zoom /= 2;
	}
	//Center cam
	var w2 = map.canvas.width/2;
	var h2 = map.canvas.height/2;
	var oldZoom = map.zoom * 2;
	map.xOff = w2 - map.zoom * ((w2 - map.xOff)/oldZoom);
	map.yOff = h2 - map.zoom * ((h2 - map.yOff)/oldZoom);
};

Map.setFocus = function(node){
	map.curFocus = node;
	map.focus();
};


Map.update = function(timeSinceLastFrame){
	
	map.focus();
	
	
	if(Keyboard.pressed[Keyboard.A] === true){ 
		Map.incrXOff(map.MOVESPEED * timeSinceLastFrame);
	}
	if(Keyboard.pressed[Keyboard.D] === true){ 
		Map.incrXOff(-map.MOVESPEED * timeSinceLastFrame);
	}
	if(Keyboard.pressed[Keyboard.W] === true){ 
		Map.incrYOff(map.MOVESPEED * timeSinceLastFrame);
	}
	if(Keyboard.pressed[Keyboard.S] === true){ 
		Map.incrYOff(-map.MOVESPEED * timeSinceLastFrame);
	}
	
};



Map.toMapX = function(x){
	return map.zoom*x + map.xOff;
}

Map.toMapY = function(y){
	return map.zoom*y + map.yOff;
}



