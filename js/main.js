var browser={
	versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //�ƶ��ն�������汾��Ϣ
            trident: u.indexOf('Trident') > -1, //IE�ں�
            presto: u.indexOf('Presto') > -1, //opera�ں�
            webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //�Ƿ�Ϊ�ƶ��ն�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻�uc�����
            iPhone: u.indexOf('iPhone') > -1 , //�Ƿ�ΪiPhone����QQHD�����
            wp : u.indexOf('Windows Phone') > -1,
            iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
            webApp: u.indexOf('Safari') == -1 //�Ƿ�webӦ�ó���û��ͷ����ײ�
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
