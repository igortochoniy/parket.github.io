$(document).ready(function () {
	$(".slider").slick({
		infinite: true,
		arrows: false,
		dots: false,
		autoplay: false,
		speed: 800,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	//ticking machine
	var percentTime;
	var tick;
	var time = 1;
	var progressBarIndex = 0;

	$('.progressBarContainer1 .progressBar').each(function (index) {
		var progress = "<div class='inProgress inProgress" + index + "'></div>";
		$(this).html(progress);
	});
	function startProgressbar() {
		resetProgressbar();
		percentTime = 0;
		tick = setInterval(interval, 10);
	}

	function interval() {
		if (($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
			progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
			startProgressbar();
		} else {
			percentTime += 1 / (time + 5);
			$('.inProgress' + progressBarIndex).css({
				width: percentTime + "%"
			});
			if (percentTime >= 100) {
				$('.single-item').slick('slickNext');
				progressBarIndex++;
				if (progressBarIndex > 2) {
					progressBarIndex = 0;
				}
				startProgressbar();
			}
		}
	}

	function resetProgressbar() {
		$('.inProgress').css({
			width: 0 + '%'
		});
		clearInterval(tick);
	}
	startProgressbar();
	// End ticking machine

	$('.progressBarContainer1 div').click(function () {
		clearInterval(tick);
		var goToThisIndex = $(this).find("span").data("slickIndex");
		$('.single-item').slick('slickGoTo', goToThisIndex, false);
		startProgressbar();
	});

	
	// Search
	$('.header__menu__search').on('click', '.search-toggle', function (e) {
		var selector = $(this).data('selector');

		$(selector).toggleClass('show').find('.search-input').focus();
		$(this).toggleClass('active');
		e.preventDefault();
	});
	// End Search


	// Tabs slider
	$('.catalog-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});

	// End Tabs slider

	// Mobile Menu
	var $menu_btn = $('.button-menu');
	$menu_btn.click(function () {
		$('body').toggleClass('js-menu');
	})

	// Icon popup
	var $btn = $('.header-contacts__item');
	$btn.hover(function () {
		$(this).toggleClass('show-more-menu');
	})


});