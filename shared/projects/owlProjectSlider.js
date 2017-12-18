
$(document).ready(function(){
	var owl = $(".owl-carousel")
	owl.owlCarousel({
		loop:false,
		items:1,
		margin:20,
		smartSpeed:1250,
		
		nav:true,
		dots:true,
		navText: ['&lt','&gt'],
		
		autoplay:true,
		autoplayTimeout:7000,
	});
});