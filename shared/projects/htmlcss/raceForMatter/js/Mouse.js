/*
	// Race for Matter - Map  \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/



function Mouse(gameCore, gameCanvas){
	var core = gameCore;
	var canvas = gameCanvas
	var down = false;
	var consumed = false;
	var startPoint = [0, 0], endPoint = [0, 0];
	
	var mouseCoords = [0, 0];
	
	canvas.addEventListener('mousemove', mouseMove);
	canvas.addEventListener('mousedown', mouseDown);
	canvas.addEventListener('mouseup', mouseUp);
	
	
	function mouseMove(event){
		mouseCoords = toCanvCoords(event.pageX, event.pageY);
		if(down){
			endPoint = mouseCoords;
		
			if(!consumed){
				var deltaX = endPoint[0] - startPoint[0];
				var deltaY = endPoint[1] - startPoint[1];
				
				if(deltaX != 0 || deltaY != 0){
					core.mouseDragged(deltaX, deltaY);
				}
			}
		}
	}
	
	function mouseDown(event){
		var coords = toCanvCoords(event.pageX, event.pageY);
		consumed = core.mouseDown(coords[0], coords[1]);
		startPoint = coords;
	}
	
	function mouseUp(event){
		var coords = toCanvCoords(event.pageX, event.pageY);
		core.mouseUp(coords[0], coords[1]);
		consumed = false;
	}
	
	function toCanvCoords(x, y){
		var rect = canvas.getBoundingClientRect();
		var scrollX = window.scrollX, scrollY = window.scrollY;
		if(window.scrollX === undefined){
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop;
		}
		var realX = x - (Math.floor(rect.left) + scrollX);
		var realY = y - (Math.floor(rect.top) + scrollY);
		return [realX, realY];
	}
	
	
}