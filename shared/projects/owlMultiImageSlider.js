
$(document).ready(function(){
	var owl = $(".owl-carousel")
	owl.owlCarousel({
		loop:true,
		items:2,
		margin:10,
		stagePadding:4.5,
		smartSpeed:1250,
		
		nav:true,
		dots:true,
		navText: ['&lt','&gt'],
		
		autoplay:true,
		autoplayTimeout:8000,
	});
});