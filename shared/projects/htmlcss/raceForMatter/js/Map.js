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
	
	//Zoom animation
	this.slowZoom = true;
	this.slowOffset = false;
	this.targetZoom = this.zoom;
	this.zoomDiff = 0;
	this.targetXOff = this.xOff;
	this.xDiff = 0;
	this.targetYOff = this.yOff;
	this.yDiff = 0;
	
	
	this.ZOOMSPEED = 1.5;
	
	
	this.focus = function(){
		if(map.curFocus != undefined){
			map.xOff = map.canvas.width/2 - (map.zoom * map.curFocus.getX());
			map.yOff = map.canvas.height/2 - (map.zoom * map.curFocus.getY());
		}
	};
	
	this.centerToNewZoom = function(oldZoom){
		var w2 = map.canvas.width/2;
		var h2 = map.canvas.height/2;
		map.targetXOff = w2 - map.targetZoom * ((w2 - map.targetXOff)/oldZoom);
		map.targetYOff = h2 - map.targetZoom * ((h2 - map.targetYOff)/oldZoom);
		
		map.zoomDiff = map.targetZoom - map.zoom;
		map.xDiff = map.targetXOff - map.xOff;
		map.yDiff = map.targetYOff - map.yOff;
		map.slowOffset = true;
	};
};

Map.init = function(canvas){
	map = new Map(canvas);
};

Map.getZoom = function(){
	return map.zoom;
};

Map.getTargetZoom = function(){
	return map.targetZoom;
}

Map.resetZoom = function(){
	map.zoom = 1;
	map.targetZoom = 1;
};

Map.resetOffset = function(){
	map.xOff = 0;
	map.yOff = 0;
	map.slowOffset = false;
}

Map.getXOff = function(){
	return map.xOff;
};

Map.getYOff = function(){
	return map.yOff;
};

Map.incrXOff = function(incr){
	map.xOff += incr;
	map.targetXOff += incr;
};

Map.incrYOff = function(incr){
	map.yOff += incr;
	map.targetYOff += incr;
};

Map.zoomIn = function(){
	if(map.targetZoom*2<=16){
		map.targetZoom *= 2;
		
		var oldZoom = map.targetZoom / 2;
		map.centerToNewZoom(oldZoom);
	}
	
};

Map.zoomOut = function(){
	if(map.targetZoom/2 != 0){
		map.targetZoom = map.targetZoom/2;
		
		var oldZoom = map.targetZoom * 2;
		map.centerToNewZoom(oldZoom);
	}
};

Map.setFocus = function(node){
	map.curFocus = node;
	map.focus();
};


Map.update = function(timeSinceLastFrame){
	
	//Focus on focus if set
	map.focus();
	
	//Offset
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
	
	//Slow offset/zoom
	if(map.slowOffset){
		//XOffset
		if(map.targetXOff != map.xOff){
			if(map.xDiff > 0){
				map.xOff += map.xDiff * map.ZOOMSPEED * timeSinceLastFrame;
				if(map.targetXOff < map.xOff){
					map.xOff = map.targetXOff;
					if(map.yOff === map.targetYOff){
						map.slowOffset = false;
					}
				}
			}else if(map.xDiff < 0){
				map.xOff += map.xDiff * map.ZOOMSPEED * timeSinceLastFrame;
				if(map.targetXOff > map.xOff){
					map.xOff = map.targetXOff;
					if(map.yOff === map.targetYOff){
						map.slowOffset = false;
					}
				}
			}
		}else if(map.yOff === map.targetYOff){
			map.slowOffset = false;
		}
		
		//YOffset
		if(map.targetYOff != map.yOff){
			if(map.yDiff > 0){
				map.yOff += map.yDiff * map.ZOOMSPEED * timeSinceLastFrame;
				if(map.targetYOff < map.yOff){
					map.yOff = map.targetYOff;
					if(map.xOff === map.targetXOff){
						map.slowOffset = false;
					}
				}
			}else if(map.yDiff < 0){
				map.yOff += map.yDiff * map.ZOOMSPEED * timeSinceLastFrame;
				if(map.targetYOff > map.yOff){
					map.yOff = map.targetYOff;
					if(map.xOff === map.targetXOff){
						map.slowOffset = false;
					}
				}
			}
		}else{
			map.slowOffset = false;
		}
	}
	//Zoom
	if(map.zoom != map.targetZoom){
		if(map.zoomDiff > 0){
			map.zoom += map.zoomDiff * map.ZOOMSPEED * timeSinceLastFrame;
			if(map.targetZoom < map.zoom){
				map.zoom = map.targetZoom;
			}
		}else if(map.zoomDiff < 0){
			map.zoom += map.zoomDiff * map.ZOOMSPEED * timeSinceLastFrame;
			if(map.targetZoom > map.zoom){
				map.zoom = map.targetZoom;
			}
		}
	}
	
};



Map.toMapX = function(x){
	return map.zoom*x + map.xOff;
}

Map.toMapY = function(y){
	return map.zoom*y + map.yOff;
}



