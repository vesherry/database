$(function(){
	position();

	for(var i=0;i<$(".alert").length;i++){
		$(".alert").eq(i).attr("num",i);
	}
})

$(window).resize(function(){
	position();
})

$(".btn").click(function(){
	if($(this).hasClass("on")){
		$(".nav").animate({'left':0},200);
		$(this).animate({'left':'85px'},200);
		$(this).removeClass("on");
		$(this).find("i").attr("class","fa fa-angle-left");
	}else{
		$(".nav").animate({'left':'-85px'},200);
		$(this).animate({'left':0},200);
		$(this).addClass("on");
		$(this).find("i").attr("class","fa fa-angle-right");
	}
})

$(".alert").click(function(){
	var num=$(this).attr("num");
	$(".table").animate({'marginLeft':-num*$(".detail-box").width()},200);
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
})

$(".nav-list").click(function(){
	$(this).parent().stop(true,true);
	if($(this).parents(".nav-box").hasClass("on")){
		if($(this).parent().siblings().find(".nav-list").hasClass("on")){
			$(this).parent().siblings().find("ul").slideUp(250);
			$(this).parent().find("ul").slideDown(250);
			$(this).parents(".nav-box").addClass("on");
			$(this).parent().siblings().find(".nav-list").removeClass("on");
			$(this).addClass("on");
		}else{
			$(this).parent().find("ul").slideUp(250);
			$(this).parents(".nav-box").removeClass("on");
		}
	}else{
		$(this).parent().siblings().find("ul").slideUp(250);
		$(this).parent().find("ul").slideDown(250);
		$(this).parents(".nav-box").addClass("on");
		$(this).addClass("on");
	}
	
})

function position(){
	var screenHeight=$(window).height();
	$(".nav").css({'height':screenHeight});
	$(".detail").css({'top':(screenHeight-540)/2})
}