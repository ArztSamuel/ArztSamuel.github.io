/*
	// Race for Matter - UI   \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/

function UI(gameCore, canvWidth, canvHeight){
	var core = gameCore;
	var mainElmnts = [];
	var ingameElmnts = [];
	var mainMenu = true;
	var years = 0, days = 0, hours = 0, mins = 0, secs = 0; //For date

	
	//Main Menu Elements
	var solar = new Button("Solar System", function(canvWidth, canvHeight){
		return [(canvWidth - 250)/2 - 5, (canvHeight - 40)/2, 150, 40];
	}, canvWidth, canvHeight);
	solar.clicked = function(mouseX, mouseY){
		core.startNew(false);
		mainMenu = false;
		refreshIngameTexts();
		return true;
	};
	
	var rndm = new Button("Random", function(canvWidth, canvHeight){
		return [(canvWidth - 250)/2 + 150 + 5, (canvHeight - 40)/2, 100, 40];
	}, canvWidth, canvHeight);
	rndm.clicked = function(mouseX, mouseY){
		core.startNew(true);
		mainMenu = false;
		refreshIngameTexts();
		return true;
	};
	
	mainElmnts.push(solar);
	mainElmnts.push(rndm);
	
	
	//In Game elements
	
	//Time control buttons
	//Current time speed
	var timeWarp = new TextBox(core.getGameTimeString(), function(canvWidth, canvHeight){
		return [canvWidth - 25 - 50, 0, 50, 25];
	}, canvWidth, canvHeight);
	//Time backwards
	var bkwd = new Button("<<", function(canvWidth, canvHeight){
		return [canvWidth - 25 - 50 - 25, 0, 25, 25];
	}, canvWidth, canvHeight);
	bkwd.clicked = function(mouseX, mouseY){
		core.decrGameTime();
		timeWarp.setText(core.getGameTimeString());
		return true;
	};
	//Time forwards
	var fwd = new Button(">>", function(canvWidth, canvHeight){
		return [canvWidth - 25, 0, 25, 25];
	}, canvWidth, canvHeight);
	fwd.clicked = function(mouseX, mouseY){
		core.incrGameTime();
		timeWarp.setText(core.getGameTimeString());
		return true;
	};
	
	//Zoom control buttons
	//Current zoom
	var zoom = new TextBox("x" + Map.getTargetZoom(), function(canvWidth, canvHeight){
		return [canvWidth - 25 - 50, canvHeight - 25, 50, 25];
	}, canvWidth, canvHeight);
	//Zoom in
	var zoomIn = new Button("+", function(canvWidth, canvHeight){
		return [canvWidth - 25, canvHeight - 25, 25, 25];
	}, canvWidth, canvHeight);
	zoomIn.clicked = function(mouseX, mouseY){
		Map.zoomIn();
		zoom.setText("x" + Map.getTargetZoom());
		return true;
	};
	//Zoom out
	var zoomOut = new Button("-", function(canvWidth, canvHeight){
		return [canvWidth - 25 - 50 - 25, canvHeight - 25, 25, 25];
	}, canvWidth, canvHeight);
	zoomOut.clicked = function(mouseX, mouseY){
		Map.zoomOut();
		zoom.setText("x" + Map.getTargetZoom());
		return true;
	};
	
	//Back
	var back = new Button("X", function(canvWidth, canvHeight){
		return [0, 0, 20, 20];
	}, canvWidth, canvHeight);
	back.clicked = function(mouseX, mouseY){
		core.stopCurrent();
		mainMenu = true;
		return true;
	};
	
	ingameElmnts.push(timeWarp);
	ingameElmnts.push(fwd);
	ingameElmnts.push(bkwd);
	ingameElmnts.push(zoom);
	ingameElmnts.push(zoomIn);
	ingameElmnts.push(zoomOut);
	ingameElmnts.push(back);
	
	
	
	
	
	this.update = function(timeSinceLastFrame){
		if(mainMenu){
			for(var i = 0; i<mainElmnts.length; i++){
				mainElmnts[i].update(timeSinceLastFrame);
			}
		}else{
			for(var i = 0; i<ingameElmnts.length; i++){
				ingameElmnts[i].update(timeSinceLastFrame);
			}
		}
		
		
		
		//Calculate date
		if(mainMenu === false){
			secs += timeSinceLastFrame * core.getGameTime();
			if(secs >= 60){
				mins += Math.floor(secs/60);
				secs %= 60;
				if(mins >= 60){
					hours += Math.floor(mins/60);
					mins %= 60;
					if(hours >= 24){
						days += Math.floor(hours/24);
						hours %= 24;
						if(days >= 365){
							years += Math.floor(days/365) ;
							days %= 365;
						}
					}
				}
			}
		}
	};
	
	this.draw = function(g){
		if(mainMenu){
			for(var i = 0; i<mainElmnts.length; i++){
				mainElmnts[i].draw(g);
			}
		}else{
			for(var i = 0; i<ingameElmnts.length; i++){
				ingameElmnts[i].draw(g);
			}
		}
		
		//Date drawing
		if(mainMenu === false){
			g.font = "10px Arial";
			g.fillStyle = "black";
			g.fillText(years + "y " + days + "d " + hours + "h " + mins + "m " + secs.toFixed(1) + "s", 5 + 20, 10);
		}
	};
	
	
	this.resize = function(canvWidth, canvHeight){
		for(var i = 0; i<mainElmnts.length; i++){
			mainElmnts[i].resize(canvWidth, canvHeight);
		}
		for(var i = 0; i<ingameElmnts.length; i++){
			ingameElmnts[i].resize(canvWidth, canvHeight);
		}		
	};
	
	this.clicked = function(mouseX, mouseY){
		if(mainMenu){
			for(var i = 0; i<mainElmnts.length; i++){
				var e = mainElmnts[i];
				if(e instanceof Button && e.isInElement(mouseX, mouseY)){
					return e.clicked(mouseX, mouseY);
				}
			}
		}else{
			for(var i = 0; i<ingameElmnts.length; i++){
				var e = ingameElmnts[i];
				if(e instanceof Button && e.isInElement(mouseX, mouseY)){
					return e.clicked(mouseX, mouseY);
				}
			}
		}
		return false;
	}
	
	
	this.resetDate = function(){
		years = 0;
		days = 0;
		hours = 0;
		mins = 0;
		secs = 0;
	};
	
	function refreshIngameTexts(){
		zoom.setText("x" + Map.getZoom());
		timeWarp.setText(core.getGameTimeString());
	};
	
}

