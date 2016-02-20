/*
	// Race for Matter - Math \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/



Vector.fromObjects = function(node1, node2){
	return new Vector(node2.getX() - node1.getX(), node2.getY() - node1.getY());
};


function Vector (x, y){
	this.x = x;
	this.y = y;

	this.divideBy = function(divider){
		this.x /= divider;
		this.y /= divider;
	};
	
	
	this.abs = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	};
	
	
	this.unitVec = function(){
		this.divideBy(this.abs());
	};
	
}