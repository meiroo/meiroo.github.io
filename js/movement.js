function MoveMent(){
	this.init = function(){
		this.content = $('#content');
		var hammertime = new Hammer(document.getElementById('content'));
		
		
		hammertime.on('swipeleft', function(ev) {
		   TweenMax.staggerTo(".imglist", 1, {rotation:0, x:"-=320"}, 0.5);
		});

		hammertime.on('swiperight', function(ev) {
		   TweenMax.staggerTo(".imglist", 1, {rotation:0, x:"+=320"}, 0.5);
		});


	}
}

$(document).ready(function() {
	var mm = new MoveMent();
	mm.init();
});

