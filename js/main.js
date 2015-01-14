var browser={
	versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            wp : u.indexOf('Windows Phone') > -1,
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
     }(),
     language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

$(function() {
	//alert(document.body.clientHeight);
	//alert(window.screen.width);
	var height = window.screen.height;
	$('#page1 .pure-img').addClass("hatch");
	//$('.page').width(height/16*9);
	//$('.page').width(800);
	//transform: scale(0.47808764940239);
	//alert($('.page').css('width'));
	var scale = 1.0;
	var yscale = 1.0;
	var xoff = 0;
	var yoff = 0;
	if(window.screen.width < 640){
		scale = window.screen.width / 640.0;
		
		
	}

	if(window.screen.height < 1012){
		yscale = window.screen.height / 1012.0;
	}

	//alert(window.screen.width + ' ' + window.screen.height);
	if(scale > yscale)
		scale = yscale;
	yoff = (1 - scale) / 2 * 1012;
	xoff = (1 - scale) / 2 * 640;
	$('.page').css('transform','scale('+scale+') '+ 'translate( -'+ xoff/scale +'px,-'+ yoff/scale + 'px)');
});
