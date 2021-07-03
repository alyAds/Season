$(document).ready(function() {
	const moon = $("#moon");
	const sun = $("#sun");
	const stars = $("#stars");
	const mountainsMalam = $(".mountains_malam");
	const mountainsSiang = $(".mountains_siang");
	const seasons = ["night", "noon", "noonRain", "nightRain"];

	let windowHeight = $(window).outerHeight();
	let ntahApa = 0;

	resizeSeasonHeight(seasons, windowHeight);

	$(window).animate({scrollTop: 0}, 400);

	const night = document.getElementById('night');
	const noon = document.getElementById('noon');
	const noonRain = document.getElementById('noonRain');
	const noonRainOffsetTop = $('#noonRain').offset().top;
	const nightRainOffsetTop = $('#nightRain').offset().top;

	let noonAxisY = seasonAxisY(noon);
	let noonRainAxisY = seasonAxisY(noonRain);
	let valScrlTop = $(window).scrollTop();


	seasonNight($(window), night, moon, stars, mountainsMalam)
	noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun)

	$(window).resize(function(event) {
		windowHeight = $(window).outerHeight(); 
		valScrlTop = $(this).scrollTop();
		noonAxisY = seasonAxisY(noon);

		resizeSeasonHeight(seasons, windowHeight)
		seasonNight($(this), night, moon, stars, mountainsMalam)
		noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun)
		seasonNoonRainUntilNightRoon($(this), noonRain, nightRainOffsetTop)
	})

	$(window).scroll(function(event) {
		windowHeight = $(window).outerHeight(); 
		valScrlTop = $(this).scrollTop();
		noonAxisY = seasonAxisY(noon);
		noonRainAxisY = seasonAxisY(noonRain);
		nightRainAxisY = seasonAxisY(noonRain);

		// $("#hij").text(valScrlTop)
		// $("#efg").text(noonRainAxisY)
		// $("#abc").text(valScrlTop)

		seasonNoonRainUntilNightRoon($(this), noonRain, nightRainOffsetTop)

		seasonNight($(this), night, moon, stars, mountainsMalam)
		seasonNoonUntilNoonRain($(this), noon, noonRain, sun, mountainsMalam, noonRainOffsetTop, nightRainOffsetTop);
	});
});

function resizeSeasonHeight(seasons, windowHeight) {
	for (var i = 0; i < seasons.length; i++) {
		$('#'+seasons[i]).height(windowHeight);
	}
}

function seasonNight(windoww, night, moon, stars, mountainsMalam) {
	let windowHeight = windoww.outerHeight(); 
	let valScrlTop = windoww.scrollTop();
	let nightAxisY = seasonAxisY(night);
	let opacityNight = opacitySeason(nightAxisY, windowHeight);

	if (nightAxisY > 0) {
		moon.css('top', (nightAxisY - (windowHeight*(60/100)))+ 'px');
	} else {
		moon.css('top', '-1000px');
	}

	stars.css({
		opacity: opacityNight,
		bottom: '-'+valScrlTop * 0.25 + 'px'
	});
	
}

function seasonNoonUntilNoonRain(windoww, noon, noonRain, sun, mountainsMalam, noonRainOffsetTop, nightRainOffsetTop) {
	let windowHeight = windoww.outerHeight(); 
	let valScrlTop = windoww.scrollTop();
	let noonAxisY = seasonAxisY(noon);
	let noonRainAxisY = seasonAxisY(noonRain);
	let opacityNight = opacitySeason(noonAxisY, windowHeight);


	if (valScrlTop > (noonAxisY - (windowHeight*(60/100))) && valScrlTop < ((noonAxisY + (windowHeight*(110/100))) - (windowHeight*(1/400)))) {
		let opacityNight = opacitySeason(noonAxisY, windowHeight) - 0.3;

		sun.css('top', (noonAxisY - (windowHeight*(60/100)))+ 'px');

		mountainsMalam.css('opacity', opacityNight);

		$(".summer-clouds, .night-clouds").css('left', '-1000px');
	} else if (valScrlTop > ((noonRainOffsetTop * (80/100)) - windowHeight) && valScrlTop < ((noonRainAxisY + (windowHeight*(110/100))) - (windowHeight*(1/400)))) {
		$(".sc1-lhc-1").css('left', '3.87vw');
		$(".sc1-lhc-2").css('left', '6.87vw');
		$(".sc1-rhc-1").css('left', '51.4vw');
		$(".sc1-rhc-2").css('left', '55.04vw');
		$(".sc1-tc-1").css('left', '38.67vw');
		$(".sc1-tc-2").css('left', '41.96vw');

		$(".sc2-tm-1").css('left', '14.40vw');
		$(".sc2-tm-2").css('left', '18.71vw');
		$(".sc2-lhc").css('left', '4.68vw');

		$(".sc3-mm").css('left', '27.48vw');

		$(".sc-rhc").css('left', '50.29vw');
		$(".sc-bm").css('left', '36.40vw');

		$(".night-clouds").css('left', '-1000px');
	} else if (valScrlTop < ((nightRainOffsetTop) - windowHeight) && valScrlTop > windowHeight) {
		$(".summer-clouds").css('left', '-1000px');
		$(".night-cloud-1").css('left', '-2vw');
		$(".night-cloud-2").css('left', '19vw');
		$(".night-cloud-3").css('left', '39vw');
		$(".night-cloud-4").css('left', '62vw');
		$(".night-cloud-5").css('left', '80vw');
		$(".night-cloud-6").css('left', '29vw');
		$(".night-cloud-7").css('left', '46vw');
		$(".night-cloud-8").css('left', '36vw');
		$(".night-cloud-9").css('left', '42vw');
		$(".night-cloud-10").css('left', '33vw');
		$(".night-cloud-11").css('left', '37vw');
		$(".night-cloud-12").css('left', '39vw');
		$(".night-cloud-13").css('left', '50vw');
		$(".night-cloud-14").css('left', '37vw');
		$(".night-cloud-15").css('left', '24vw');
		$(".night-cloud-16").css('left', '59vw');
		$(".night-cloud-17").css('left', '9vw');
	}
	$("#hij").text(valScrlTop)
	$("#abc").text(((nightRainOffsetTop) - windowHeight))

}

function seasonNoonRainUntilNightRoon(windoww, noonRain, nightRainOffsetTop) {
	let windowHeight = windoww.outerHeight(); 
	let valScrlTop = windoww.scrollTop();
	let noonRainAxisY = seasonAxisY(noonRain);

	if (valScrlTop < ((nightRainOffsetTop * (200/100)) - windowHeight) && valScrlTop > windowHeight) {
		let opacityNoon = opacitySeason(noonRainAxisY, windowHeight) - 0.3;
		
		$(".mountains_siang").css('opacity', opacityNoon);
	}

	if (valScrlTop > ((nightRainOffsetTop * (80/100)) - windowHeight)) {
		let opacityHujan = opacitySeason(valScrlTop, windowHeight) - 0.3;

		$(".rain_front").css('opacity', opacityHujan);
	} else {
		$(".rain_front").css('opacity', 0);
	}
}

function noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun) {
	if (valScrlTop < noonAxisY) {		
		sun.css('top', ((noonAxisY/2) - (windowHeight*(30/100)))+ 'px');
	}

	let opacityNight = opacitySeason(noonAxisY, windowHeight) - 0.3;
	$(".mountains_malam").css('opacity', opacityNight);
}

function opacitySeason(seasonAxisY, windowHeight) {
	return seasonAxisY / windowHeight;
}

function seasonAxisY(season) {
	return season.getBoundingClientRect().top;
}