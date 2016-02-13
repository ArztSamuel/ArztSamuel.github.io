

function Core(){
	
	var timerID;
	var nextImageTime = 10000;
	var slctors = document.getElementsByClassName("slctor");
	var curSlctor;
	var hovering = false;
	
	this.run = function(){
		
		init();
		
		timerID = setTimeout(nextImage, nextImageTime);
	}
	
	function init(){
		//Set slctor events
		for(var i = 0; i<slctors.length; i++){
			slctors[i].setAttribute("onmouseover", "core.slctorHover(this);");
			slctors[i].setAttribute("onmouseout", "core.slctorLeave();");
			slctors[i].setAttribute("onclick", "core.slctorClick(this);");
		}
	}
	
	
	this.slctorHover = function(slctor){
		clearTimeout(timerID);
		for(var i = 0; i<slctors.length; i++){
			if(hasClass(slctors[i], "on")){
				if((!(slctors[i] === slctor))){
					slctors[i].className = "slctor off";
				}
				curSlctor = slctors[i];
				break;
			}
		}
		
		hovering = true;
	}
	
	this.slctorLeave = function(){
		hovering = false;
		
		setTimeout(setCurSlctorOn, 150);
	}
	
	this.slctorClick = function(slctor){
		curSlctor = slctor;
		slctor.className = "slctor on";
	}
	
	function setCurSlctorOn(){
		if(hovering === false){
			curSlctor.className = "slctor on";
		
			clearTimeout(timerID); //Just making sure no Timeout is in progress
			timerID = setTimeout(nextImage, nextImageTime);
		}
	}
	
	
	
	
	
	
	function nextImage(){
		
		var newSlctor = 0;
		for(var i = 0; i<slctors.length; i++){
			if(hasClass(slctors[i], "on")){
				if(i >= slctors.length-1){
					newSlctor = 0;
				}else{
					newSlctor = i+1;
				}
				slctors[i].className = "slctor off";
				break;
			}
		}
		
		slctors[newSlctor].className = "slctor on";
		
		timerID = setTimeout(nextImage, nextImageTime);
	}


	
	
	function hasClass(element, cName) {
		return (' ' + element.className + ' ').indexOf(' ' + cName + ' ') > -1;
	}
}


