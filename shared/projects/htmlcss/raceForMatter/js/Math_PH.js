/*
	// Race for Matter - Math \\
	\\ A Game by Samuel Arzt  //
	 \\ 		2016		 //
*/

function Math_PH(){};

//Constants
Math_PH.Grav = 6.674E-11;
Math_PH.PX_TO_M = 1e6; //One px = 1000km
Math_PH.DENSITY = 5510; //Using density of earth for all nodes... cause who gives a sh... as long as it's only used for radius calculation


Math_PH.pixelToM = function(px){
	return px *= Math_PH.PX_TO_M;
};

Math_PH.mToPixel = function(m){
	return m /= Math_PH.PX_TO_M;
};



