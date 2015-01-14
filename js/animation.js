var Anime = {};
Anime.FromTo = 0;
Anime.To = 1;

Anime.Scene = {
	DefaultShow : function(){
		var ani = {};
		ani.From = {rotation:30,y:300};
		ani.To = {rotation:0, y:0};
		ani.Time = 0.5;
		return ani;
	},
	DefaultHide : function(){
		var ani = {};
		ani.From = {rotation:0,y:-300};
		ani.To = {rotation:-30, y:-1000};
		ani.Time = 0.5;
		return ani;
	},
	RotationBack:function(){
		var ani = {};
		ani.From = {rotation:0};
		ani.To = {rotation:360,repeat:-1,repeatDelay:0.5,ease:Back.easeOut};
		ani.Time = 0.5;
		return ani;

	},
	PositionTo:function(pan){
		var ani = {};
		ani.To = {x:pan};
		ani.Time = 0.5;
		ani.type = Anime.To;
		return ani;
	}
}

Anime.isTweening =  function(elestr){
	return TweenMax.isTweening(elestr);
}

Anime.Run = function(elestr,ani,callback){
	if(callback){
		ani.To.onComplete = callback;
	}else{
		ani.To.onComplete = null;
	}
	if(ani.type === Anime.To){
		TweenMax.to(elestr, ani.Time, ani.To);
	}else{
		TweenMax.fromTo(elestr, ani.Time, ani.From, ani.To);
	}
}