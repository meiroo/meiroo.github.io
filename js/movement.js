function Page(str){
	this.ele = $('#'+str);
	this.hammertime = new Hammer(document.getElementById(str));
	var pan = 0;
	

	this.hammertime.on('swipeleft', function(ev) {
	   pan -= 320;
	   TweenMax.staggerTo("#"+str+" .imglist img", 1, {x:pan}, 0.0);
	});

	this.hammertime.on('swiperight', function(ev) {
		pan += 320;
	   TweenMax.staggerTo("#"+str+" .imglist img", 1, {x:pan}, 0.0);
	});

	this.showAni = function(){
		this.ele.show();
		TweenMax.staggerFromTo("#"+str, 1, {rotation:30,opacity:0.5,y:0},{rotation:0, y:-300,opacity:1}, 0);
		TweenMax.staggerFromTo("#"+str+" .pure-img", 1, {rotation:0},{rotation:360,repeat:-1,repeatDelay:0.5,ease:Back.easeOut},0.3);
		TweenMax.staggerFromTo("#"+str+" .pure-u-1-3", 1, {scale:0},{scale:1,ease:Bounce.easeOut},0.0);
		
	}

	this.hideAni = function(onComplete){
		TweenMax.staggerFromTo("#"+str, 1, {rotation:0,opacity:1,y:-300},{rotation:-30, y:-1000,opacity:0.5}, 0,onComplete);
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




		this.hammertime = new Hammer(document.getElementById('main'));
		this.hammertime.on('swipeup', function(ev) {
		   pages[currentindex].hideAni(function(){
		   		pages[currentindex].ele.hide();
		   		currentindex = ++currentindex % 3;
		   		pages[currentindex].showAni();
		   });
		   
		});
		this.hammertime.get('swipe').set({enable: true, direction: Hammer.DIRECTION_ALL });

		this.songzhufu = new Hammer(document.getElementById('songzhufu'));
		this.songzhufu.on('tap', function(ev) {
			self.hammertime.off('swipeup');
			pages[currentindex].hideAni(function(){
		   		pages[currentindex].ele.hide();
		   		new Page('page4').showAni();
		   });
		});
		$('.pure-form').submit(function(event) {
			event.preventDefault();
			alert('submit!');
		})
	}




}

$(document).ready(function() {
	var mm = new Scene();
	mm.init();
});

