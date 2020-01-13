$(document).ready(function(){
	TweenMax.staggerFrom($(".menuItem"), .25, {opacity:0, x:"-=20px"}, .1);

	$('.menuItem').on("click", toggleContent);
	
	$(document).on("click", '.opensModal a', function(e){
		if ($(this).attr("target") != "_blank"){
			e.preventDefault();
			
			$("iframe").css("display", "block");
			$(".modal-body img").css("display", "none");
			
			var url = $(this).attr("href");
			var lastThree = url.substr(url.length - 4);		
			var modal = $("#modal");
			
			$("#fullscreen").attr("href", url);
			
			// if (url.indexOf("youtube") > -1){
				// url = url.replace('watch?v=', 'embed/');
			// }
			
			url = url.replace('watch?v=', 'embed/');
			
			$(".modal-body iframe").attr("src", url);
			
			// if (url.indexOf("maps") > -1 && url.indexOf("interactive") < 0){
				// $(".modal-body img").attr("src", url);
				// url = url.replace("maps/", "maps/full/").replace(".jpg", ".png");
				// $(".modal-body img").css("display", "block");
				// $("iframe").css("display", "none");
				// $("#fullscreen").attr("href", url);
			// } else {
				// $(".modal-body iframe").attr("src", url);
			// }
				
			modal.css("display", "block");
			TweenLite.from(modal, .25, {opacity:0, y:"+=40px", delay:.15});
		}	
	});
	
	$(".contact").on("click", function(){
		$("#social").fadeOut(300);
		$(".bottomLine").addClass("contactClicked");
	});
	
	$(".hamburger").on("click", toggleHamburger);
	
	//modal
	var modal = $("#modal");
	var close = $("#close");

	document.addEventListener("keydown", escapeModal, false);

	function escapeModal(e) {
	  var keyCode = e.keyCode;
	  if(keyCode==27) {
		modal.css("display", "none");
		clearModal();
	  }
	}
	
	close.on("click", function(){
		modal.css("display", "none");
		clearModal();
	});
	
	function clearModal(){
		$("#fullscreen").attr("href", "");
		$(".modal-body iframe").attr("src", "");
		$(".modal-body img").attr("src", "");
	}
});

function toggleContent(){
	window.scrollTo(0, 0);
	
	if ($(".open"))
	{
		toggleHamburger();
	}
		
	var $clicked = $(this)
	
	if ($($clicked.attr('data-item')).hasClass("active"))
	{
		return;
	}
	
    $('.menuItem').each(function () {
		var $menu = $(this);
        if (!$menu.is($clicked)) {
            $($menu.attr('data-item')).closest(".row").hide();
        }
    });
	
	$(".clicked").removeClass("clicked");
	$(this).addClass("clicked");
	
	var active = $(".active");
	var kartice = active.find(".kartica");
	
	//ubija prethodno aktivne animacije kartica
	TweenLite.killTweensOf(kartice);
	TweenMax.set(kartice, {clearProps:"y"});
	
	//sakriva prethodno aktivne kartice
	TweenLite.set(kartice, {css:{opacity:0}});
	
	//prebacuje active i radi load html-a
	active.removeClass("active");

	var pageToLoad = $clicked.attr("data-item").substr(1) + ".html";

	$("#content").load(pageToLoad, function(){
		active = $($clicked.attr('data-item'));
		active.addClass("active");
		// active.closest(".row").toggle();
		// TweenLite.from($("h2"), .25, {opacity:0, y:"+=40px", delay:.15});
		
		//otkriva social
		if (!($("#contact").hasClass("active")))
		{
			$("#social").fadeIn(300);
			$(".bottomLine").removeClass("contactClicked");
		}
		
		//proverava da li je kliknut about me (nema kartice, pa se animira samo tekst)
		var clickedItem = $clicked.data("item");

		if (clickedItem === '#aboutMe')
		{
			TweenLite.from($("h2"), .25, {opacity:0, y:"+=40px", delay:.15});
			var tekst = active.find("#blockOfText");
			TweenLite.from(tekst, .25, {opacity:0, y:"+=40px", delay:.15});
			
			return;
		}

		if (clickedItem === '#blog')
		{
			kartice = active.find(".blogPost");
			TweenMax.staggerTo(kartice, 0.4, {opacity:1, y:"-=40px"}, .15);
		} else {
			TweenLite.from($("h2"), .25, {opacity:0, y:"+=40px", delay:.15});
			kartice = active.find(".kartica");
			TweenMax.staggerTo(kartice, .25, {opacity:1, y:"-=40px"}, .15);
		}
	});
}

function toggleHamburger(){
	var hamburger = $(".hamburger");
	
	if (hamburger.css("display") === "block")
	{
		var menu = hamburger.closest(".box");
		
		hamburger.toggleClass("change");
		menu.toggleClass("open");
	}	
}

