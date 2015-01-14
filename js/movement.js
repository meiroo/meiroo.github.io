function Page(str){
	this.ele = $('#'+str);
	var pan = 0;
	

	this.swipeleft =  function(ev) {
	   if(TweenMax.isTweening("#"+str+" .imglist img"))return;
	   pan -= 320;
	   console.log(pan);
	   TweenMax.staggerTo("#"+str+" .imglist img", 0.5, {x:pan}, 0.0);
	}

	this.swiperight = function(ev) {
		if(TweenMax.isTweening("#"+str+" .imglist img"))return;
		pan += 320;
		console.log(pan);
	    TweenMax.staggerTo("#"+str+" .imglist img", 0.5, {x:pan}, 0.0);
	}

	this.showAni = function(){
		this.ele.show();
		TweenMax.fromTo("#"+str, 0.5, {rotation:30,y:300},{rotation:0, y:0});
		TweenMax.fromTo("#"+str+" .pure-img", 0.5, {rotation:0},{rotation:360,repeat:-1,repeatDelay:0.5,ease:Back.easeOut});
		TweenMax.fromTo("#"+str+" .pure-u-1-3", 0.5, {scale:0},{scale:1,ease:Bounce.easeOut});
		
	}

	this.hideAni = function(onComplete){
		TweenMax.fromTo("#"+str, 0.5, {rotation:0,y:-300},{rotation:-30, y:-1000,onComplete:onComplete});
	}

}



function Scene(){
	this.init = function(){
		var self = this;
		this.content = $('.page');
		$('.page').hide();
		var page1 = new Page('page1');
		var page2 = new Page('page2');
		var page3 = new Page('page3');
		var pages = [page1,page2,page3];
		var currentindex = 0;
		pages[currentindex].showAni();




		
		$('body').hammer({direction: Hammer.DIRECTION_ALL }).bind("panup swipeup", function(ev) {
		   ev.preventDefault();
		   pages[currentindex].hideAni(function(){
		   		pages[currentindex].ele.hide();
		   		currentindex = ++currentindex % 3;
		   		pages[currentindex].showAni();
		   });
		   
		});


		$('body').hammer().bind("swipeleft", function(ev) {
		   ev.preventDefault();
		   pages[currentindex].swipeleft();
		});
		$('body').hammer().bind("swiperight", function(ev) {
		   ev.preventDefault();
		   pages[currentindex].swiperight();
		});


		this.songzhufu = new Hammer(document.getElementById('songzhufu'));
		this.songzhufu.on('tap', function(ev) {
			self.hammertime.off('swipeup');
			pages[currentindex].hideAni(function(){
		   		pages[currentindex].ele.hide();
		   		new Page('page4').showAni();
		   });
		});
		$('.hongbao-form').submit(function(event) {
			event.preventDefault();
			alert('submit!');
		})
	}




}

$(document).ready(function() {
	var mm = new Scene();
	mm.init();
});

