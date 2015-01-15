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

var pageAni = {};
pageAni.onPage0 = function(){
	$('#page0 .h1').addClass('bigEntrance');
	$('#page0 .drop-cap').addClass('slideRight');
	$('#page0 .three-fourths').addClass('slideLeft');
	$('#page0 button').addClass("slideRight");
	
	
}
pageAni.onPage1 = function(){
	$('#page1 .pure-img').addClass("pulse");
	$('#page1 .moveimg').addClass("hatch");	
	$('#page1 video').addClass('pullUp');
}
pageAni.onPage2 = function(){
	$('#page2 .pure-img').addClass("bounce");
	$('#page2 .moveimg').addClass("pullUp");
}
pageAni.onPage3 = function(){
	$('#page3 .pure-img').addClass("pulse");
	$('#page3 .moveimg').addClass("pullDown");
}
pageAni.onPage4 = function(){
	$('#page4 button').addClass('slideExpandUp');
	$('#page4 textarea').addClass('bounce');
}

$(function() {
	var mySwiper = new Swiper('.swiper-container',{
        //pagination: '.pagination',
        paginationClickable: true,
        mode: 'vertical',
        calculateHeight: true,
        speed:750, 
        cssWidthAndHeight:true,
        onInit:function(swiper){
        	pageAni.onPage0();
        },
        onSlideChangeEnd:function(swiper,direction){
        	var index = swiper.activeIndex;
        	if(index ==1){
        		pageAni.onPage1();
        	}
        	if(index ==2)
        		pageAni.onPage2();
        	if(index ==3)
        		pageAni.onPage3();
        	if(index ==4)
        		pageAni.onPage4();
        }
      });

	var width = document.body.clientWidth;
	var height = window.screen.height;
	
	var scale = 1.0;
	var xoff = 0;
	var yoff = 0;

	//alert('width: '+document.body.clientWidth + ":" + window.screen.width);
	//alert('height: '+document.body.clientHeight + ":" + window.screen.height);

	if(width>640 && height < 1012){
		scale = height / 1012.0;
		//alert(width);
		yoff = (1 - scale) / 2 * 1012;
		xoff = 1.0;
		var transformContent = 'scale('+scale+') '+ 'translate( -'+ xoff/scale +'px,-'+ yoff/scale + 'px)';
		 $(".page").css({
		  transform: transformContent,
		  MozTransform: transformContent,
		  WebkitTransform: transformContent,
		  msTransform: transformContent
		 });
	}
	
	
});
