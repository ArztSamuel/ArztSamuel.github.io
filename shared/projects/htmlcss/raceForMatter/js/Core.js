/*
	// Race for Matter - Core \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/



function Core (){
	var core = this;
	var canvas;
	var canvX;
	var canvY;
	var canvCont;
	var g; //g -> Graphics
	var timeoutID;
	var running;
	
	var nodes = [];
	var ui;
	
	
	
	this.run = function(){
		
		init();
		
		start();
		
	};
	
	
	
	
	//Initialization
	function init(){
		//Get canvas
		canvas = document.getElementById("drawCanvas");
		canvCont = document.getElementById("canvCont");
		canvX = canvCont.offsetTop;
		canvY = canvCont.offsetLeft;
		
		//Set canvas size
		canvas.width = canvCont.offsetWidth;
		canvas.height = canvCont.offsetHeight;
		
		g = canvas.getContext("2d");
		
		//Resize canvas with window
		window.onresize = function(event) {
			canvas.width = canvCont.offsetWidth;
			canvas.height = canvCont.offsetHeight;
			
			ui.resize(canvas.width, canvas.height);
		};
		
		//Input
		//Mouse
		var mouse = new Mouse(core, canvas);
		//Keyboard
		document.addEventListener('keydown', keyDown);
		document.addEventListener('keyup', keyUp);
		

		//Initialize Game Objects
		Map.init(canvas);
		ui = new UI(core, canvas.width, canvas.height);
				
		running = true;
	}
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	
	
	//Game-Loop
	var lastFrame = Date.now();
	var countFPS = true;
	var fpsTimer = 0;
	var fpsCounter = 0;
	var fps = 0;
	const targetFPS = 60;
	const targetFrameTime = 1000/targetFPS;
	var gameTime = 0;
	var gameTimeValues = [1, 2, 10, 100, 1000, 10000, 100000, 250000, 500000, 7.5e5, 1e6, 2e6, 3e6, 4e6, 5e6, 1e7];
	var gameTimeStrings = ["x1", "x2", "x10", "x100", "x1000", "x10k", "x100k", "x250k", "x500k", "x750k", "x1M", "x2M", "x3M", "x4M", "x5M", "x10M"];
	
	function start(){

		var timeSinceLastFrame = (Date.now() - lastFrame)/1000;
		lastFrame = Date.now();
		
		//FPS Counting
		if(countFPS){
			fpsCounter++;
			fpsTimer += timeSinceLastFrame;
			if(fpsTimer>=1){
				fpsTimer = 0;
				fps = fpsCounter;
				fpsCounter = 0;
			}
		}
		
		update(timeSinceLastFrame);
		draw();
		
		if(running){ //For stop mechanism
			var renderTime = Date.now() - lastFrame;
			var sleepTime = targetFrameTime - renderTime > 0 ? targetFrameTime - renderTime : 0;
			timeoutID = setTimeout(start, sleepTime);
		}
	}
	
	function stop(){
		
		running = false;
		clearTimeout(timeoutID);
		
	}
	
	this.startNew = function(rndm){
		if(rndm){
			//Random Nodes
			for(var i = 0; i<20; i++){
				var rndmX = Math.floor(Math.random() * 200000) - 100000;
				var rndmY = Math.floor(Math.random() * 200000) - 100000;
				var rndmVX = Math.random() * 120000 - 60000;
				var rndmVY = Math.random() * 120000 - 60000;
				var rndmMant = Math.floor(Math.random() * 8) + 1;
				var rndmE;
				var rndm = Math.random();
				if(rndm>0.80){
					rndmE = Math.floor(Math.random() * 20) + 13;
				}else if(rndm>0.25){
					rndmE = Math.floor(Math.random() * 10) + 15;
				}else{
					rndmE = Math.floor(Math.random() * 5) + 10;
				}
				var rndmM = rndmMant * 10 * Math.pow(10, rndmE);
				var node = new Node(undefined, rndmX, rndmY, Math_PH.mToPixel(rndmVX), Math_PH.mToPixel(rndmVY), rndmM, undefined, getRandomColor(), nodes);
				nodes.push(node);
			}
		}else{
			//Solar System
			var earth = new Node("Earth", canvas.width/2, canvas.height/2, 0, Math_PH.mToPixel(29780), 5.9722e24, 5515, 'green', nodes);
			var moon = new Node("Moon", earth.getX() + 384.6, earth.getY(), earth.getVelX() + 0, earth.getVelY() + Math_PH.mToPixel(1023), 7.349e22, 3341, 'gray', nodes);
			var sun = new Node("Sun", earth.getX() - 149600, earth.getY() - 0, 0, 0, 1.98892e30, 1408, 'yellow', nodes);
			var mars = new Node("Mars", sun.getX() + 227990, sun.getY() + 0, 0, Math_PH.mToPixel(24130), 6.419e23, 3933, 'fireBrick', nodes);
			var mercury = new Node("Mercury", sun.getX() + 57909, sun.getY() + 0, 0, Math_PH.mToPixel(47360), 6.419e23, 5427, 'gray', nodes);
			var venus = new Node("Venus", sun.getX() + 108160, sun.getY() + 0, 0, Math_PH.mToPixel(35020), 4.896e24, 5243, 'gold', nodes);
			var jupiter = new Node("Jupiter", sun.getX() + 778630, sun.getY() + 0, 0, Math_PH.mToPixel(13070), 1.899e27, 1326, 'burlyWood', nodes);
			var saturn = new Node("Saturn", sun.getX() + 1433500, sun.getY() + 0, 0, Math_PH.mToPixel(9690), 5.685e26, 687, 'burlyWood', nodes);
			var uranus = new Node("Uranus", sun.getX() + 2872400, sun.getY() + 0, 0, Math_PH.mToPixel(6810), 8.683e25, 1270, 'royalBlue', nodes);
			var neptune = new Node("Neptune", sun.getX() + 4495000, sun.getY() + 0, 0, Math_PH.mToPixel(5430), 1.0243e26, 1638, 'blue', nodes);
			
			nodes.push(earth);
			nodes.push(moon);
			nodes.push(sun);
			nodes.push(mars);
			nodes.push(mercury);
			nodes.push(venus);
			nodes.push(jupiter);
			nodes.push(saturn);
			nodes.push(uranus);
			nodes.push(neptune);
			
			//Set camera to earth
			Map.setFocus(earth);
			Map.setFocus(undefined);
		}
	};
	
	this.stopCurrent = function(){
		nodes = [];
		Map.setFocus(undefined);
		Map.resetZoom();
		Map.resetOffset();
		gameTime = 0;
		ui.resetDate();
	};
	
	
	var maxDelta = 100;
	
	function update(timeSinceLastFrame){
		
		//Update nodes while considering maxDelta time
		if(nodes.length > 0){
			var updateDelta = timeSinceLastFrame * gameTimeValues[gameTime];
			if(updateDelta > maxDelta){
				var cycleAmount = Math.floor(updateDelta/maxDelta);
				var lastDelta = updateDelta%maxDelta;
				
				for(var cycle = 0; cycle<cycleAmount; cycle++){
					for(var i = 0; i<nodes.length; i++){
						nodes[i].update(maxDelta);
					}
				}
				
				//Apply last delta
				if(lastDelta > 0){
					for(var i = 0; i<nodes.length; i++){
						nodes[i].update(lastDelta);
					}
				}
			}else{
				for(var i = 0; i<nodes.length; i++){
					nodes[i].update(updateDelta);
				}
			}
		}
		
		
		//UI
		ui.update(timeSinceLastFrame);
		
		//Map
		Map.update(timeSinceLastFrame);
		
	}
	
	function draw(){
		
		//Background
		g.fillStyle = 'lightGray';
		g.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
		
		//Nodes
		if(nodes.length > 0){
			for(var i = 0; i<nodes.length; i++){
				nodes[i].draw(g);
			}
		}
		
		//UI
		ui.draw(g);
		
		//FPS Drawing
		if(countFPS){
			g.font = "30px Arial";
			g.fillStyle = "yellow";
			g.fillText(fps, 10, canvas.offsetHeight - 10);
		}
		
	}
	
	//Mouse events
	this.mouseDown = function(mouseX, mouseY){
		return ui.clicked(mouseX, mouseY);
	}
	
	this.mouseUp = function(mouseX, mouseY){
		
	}
	
	this.mouseDragged = function(deltaX, deltaY){
		
	}
	
	
	//Keyboard events
	function keyDown(event){
		Keyboard.pressed[event.keyCode] = true;
	}
	
	function keyUp(event){
		Keyboard.pressed[event.keyCode] = false;
	}
	
	
	this.incrGameTime = function(){
		if(gameTime === gameTimeValues.length-1){
			return;
		}else{
			gameTime++;
		}
	};
	this.decrGameTime = function(){
		if(gameTime === 0){
			return;
		}else{
			gameTime--;
		}
	};
	
	this.getGameTime = function(){
		return gameTimeValues[gameTime];
	};
	
	this.getGameTimeString = function(){
		return gameTimeStrings[gameTime];
	};
	
	
	
}


