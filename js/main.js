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

$(function() {
	var mySwiper = new Swiper('.swiper-container',{
        //pagination: '.pagination',
        paginationClickable: true,
        mode: 'vertical',
        calculateHeight: true,
        speed:750, 
        cssWidthAndHeight:true,
      });

	//alert(document.body.clientWidth);
	//alert(window.screen.width);
	//alert(document.body.clientHeight);
	//alert(window.screen.height);
	//alert( document.body.clientWidth);
	//alert( document.body.clientHeight);
	var width = document.body.clientWidth;
	var height = window.screen.height;

	$('#page1 .pure-img').addClass("hatch");
	//$('.page').width(height/16*9);
	//$('.page').width(800);
	//transform: scale(0.47808764940239);
	//alert($('.page').css('width'));
	var scale = 1.0;
	var xoff = 0;
	var yoff = 0;

	alert('width: '+document.body.clientWidth + ":" + window.screen.width);
	alert('height: '+document.body.clientHeight + ":" + window.screen.height);

	if(height < 1012){
		scale = height / 1012.0;
	}
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
});
