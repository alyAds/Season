$(document).ready(function() {
	const moon = $("#moon");
	const sun = $("#sun");
	const stars = $("#stars");
	const mountainsMalam = $(".mountains_malam");
	const mountainsSiang = $(".mountains_siang");
	const seasons = ["night", "noon", "noonRain", "nightRain"];

	let windowHeight = $(window).outerHeight();
	let valScrlTop = $(window).scrollTop();
	let ntahApa = 0;

	for (var i = 0; i < seasons.length; i++) {
		$('#'+seasons[i]).height(windowHeight);
	}

	const night = document.getElementById('night');
	const noon = document.getElementById('noon');
	const noonRain = document.getElementById('noonRain');
	const noonRainOffsetTop = $('#noonRain').offset().top;
	const nightRainOffsetTop = $('#nightRain').offset().top;

	let noonAxisY = seasonAxisY(noon);
	let noonRainAxisY = seasonAxisY(noonRain);

	seasonNight($(window), night, moon, stars, mountainsMalam)
	noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun)

	$(window).resize(function(event) {
		seasonNight($(this), night, moon, stars, mountainsMalam)
		noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun)
	})

	$(window).scroll(function(event) {
		windowHeight = $(window).outerHeight(); 
		valScrlTop = $(this).scrollTop();
		noonAxisY = seasonAxisY(noon);
		noonRainAxisY = seasonAxisY(noonRain);

		$("#hij").text(valScrlTop)
		$("#efg").text(noonRainAxisY)
		// $("#abc").text(valScrlTop)

		seasonNight($(this), night, moon, stars, mountainsMalam)

		if (valScrlTop > (noonAxisY - (windowHeight*(60/100))) && valScrlTop < ((noonAxisY + (windowHeight*(110/100))) - (windowHeight*(1/400)))) {
			let opacityNight = opacitySeason(noonAxisY, windowHeight) - 0.3;

			sun.css('top', (noonAxisY - (windowHeight*(60/100)))+ 'px');

			mountainsMalam.css('opacity', opacityNight);

			$(".clouds").css('left', '-1000px');
			
		} else if (valScrlTop > ((noonRainOffsetTop * (80/100)) - windowHeight) && valScrlTop < ((noonRainAxisY + (windowHeight*(110/100))) - (windowHeight*(1/400)))) {
			$(".sc1-lhc-1").css('left', 53);
			$(".sc1-lhc-2").css('left', 94);
			$(".sc1-rhc-1").css('left', 703);
			$(".sc1-rhc-2").css('left', 753);
			$(".sc1-tc-1").css('left', 529);
			$(".sc1-tc-2").css('left', 574);

			$(".sc2-tm-1").css('left', 197);
			$(".sc2-tm-2").css('left', 256);
			$(".sc2-lhc").css('left', 64);

			$(".sc3-mm").css('left', 376);

			$(".sc-rhc").css('left', 688);
			$(".sc-bm").css('left', 498);
		} else if (valScrlTop < ((nightRainOffsetTop * (80/100)) - windowHeight)) {
			$(".clouds").css('left', '-1000px');
		}
	});
});

function seasonNight(windoww, night, moon, stars, mountainsMalam) {
	let windowHeight = windoww.outerHeight(); 
	let valScrlTop = windoww.scrollTop();
	let nightAxisY = seasonAxisY(night);
	let opacityNight = opacitySeason(nightAxisY, windowHeight);

	if (nightAxisY > (windowHeight*(22/100))) {
		moon.css('top', (nightAxisY - (windowHeight*(75/100)))+ 'px');
	}

	stars.css({
		opacity: opacityNight,
		bottom: '-'+valScrlTop * 0.25 + 'px'
	});
	
}

function noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun) {
	if (valScrlTop < noonAxisY) {
		sun.css('top', ((noonAxisY/2) - (windowHeight*(30/100)))+ 'px');
	}
}

function opacitySeason(seasonAxisY, windowHeight) {
	return ((seasonAxisY / windowHeight) * 100) / 100;
}

function seasonAxisY(season) {
	return season.getBoundingClientRect().top;
}