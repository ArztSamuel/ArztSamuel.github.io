/*
	// Race for Matter - Node \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/





function Node(nodeName, xCoord, yCoord, startVelx, startVely, startMass, startDensity, initColor, otherNodes){
	var name = nodeName;
	var x = xCoord;
	var y = yCoord;
	var velx = startVelx;
	var vely = startVely;
	var mass = startMass;
	var density = startDensity;
	var radius = calcRadius();
	var color = initColor;
	var drawName = true;
	var drawSpeeds = false;
	var drawMass = true;
	
	var nodes = otherNodes;
	
	
	
	
	this.update = function(timeSinceLastFrame){
		
		for(var i = 0; i<nodes.length; i++){
			var curObj = nodes[i];
			if(curObj === this){
				continue;
			}
			
			//Collision detection
			var v = Vector.fromObjects(this, curObj);
			var dist = v.abs();
			if(dist < radius + curObj.getRadius()){
				if(mass >= curObj.getMass()){
					mass += curObj.getMass();
					radius = calcRadius();
					nodes.splice(i, 1); //Remove node
				}else{
					curObj.incrMass(mass);
					curObj.recalcRadius();
					nodes.splice(getIndexOf(this), 1); //Remove node
				}
			}
			
			
			v.divideBy(dist); //Create unit-vector
			dist = Math_PH.pixelToM(dist);
		
			var acc = Math_PH.Grav * (curObj.getMass() / (dist * dist));
			acc = Math_PH.mToPixel(acc);
			
			
			//apply gravity to node velocity
			velx += acc * timeSinceLastFrame * v.x;
			vely += acc * timeSinceLastFrame * v.y;
			
		}
		
		//apply velocity to node coordinates
		x += velx * timeSinceLastFrame;
		y += vely * timeSinceLastFrame;
	}
	
	this.draw = function(g){
		
		var bigger1Px = radius * Map.getZoom()>0.5;
		
		if(bigger1Px){
			g.beginPath();
			g.arc(Map.toMapX(x), Map.toMapY(y), radius * Map.getZoom(), 0, 2 * Math.PI, false);
			g.fillStyle = color;
			g.fill();
			g.lineWidth = 1;
			g.strokeStyle = 'black';
			g.stroke();
		}
		
		var infoOffset = Map.toMapY(y) + radius * Map.getZoom();
		g.font = "10px Arial";
		if(name != undefined && drawName){
			g.fillStyle = color;
			infoOffset += 10;
			g.fillText(name, Map.toMapX(x) - g.measureText(name).width/2, infoOffset);
		}
		g.fillStyle = "yellow";
		if(drawSpeeds){
			infoOffset += 10;
			g.fillText("x" + velx.toFixed(3), Map.toMapX(x) - 35, infoOffset);
			g.fillText("y" + vely.toFixed(3), Map.toMapX(x) + 5, infoOffset);
		}
		if(drawMass && (bigger1Px || name === undefined)){
			infoOffset += 10;
			var txt = "m:" + mass;
			g.fillText(txt, Map.toMapX(x) - g.measureText(txt).width/2, infoOffset);
		}
	};
	
	this.getX = function(){
		return x;
	};
	this.getY = function(){
		return y;
	};
	
	this.getVelX = function(){
		return velx;
	};
	this.getVelY = function(){
		return vely;
	};
	
	this.getMass = function(){
		return mass;
	};
	
	this.incrMass = function(incr){
		mass += incr;
	}
	
	this.getRadius = function(){
		return radius;
	};
	
	this.recalcRadius = function(){
		radius = calcRadius();
	};
	
	function calcRadius(){
		var temp;
		if(density === undefined){
			temp = (3*mass) / (4*Math.PI*Math_PH.DENSITY);
		}else{
			temp = (3*mass) / (4*Math.PI*density);
		}
		return Math_PH.mToPixel(Math.pow(temp, 1/3));
	};
	
	function getIndexOf(node){
		for(var i = 0; i<nodes.length; i++){
			if(nodes[i] === node){
				return i;
			}
		}
		return -1;
	};
	
}