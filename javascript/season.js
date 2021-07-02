$(document).ready(function() {
	const moon = $("#moon");
	const sun = $("#sun");
	const stars = $("#stars");
	const mountainsMalam = $(".mountains_malam");
	const mountainsSiang = $(".mountains_siang");
	const seasons = ["night", "noon", "noonRain", "nightRain"];

	let windowHeight = $(window).outerHeight();
	let valScrlTop = $(window).scrollTop();

	for (var i = 0; i < seasons.length; i++) {
		$('#'+seasons[i]).height(windowHeight);
	}

	const night = document.getElementById('night');
	const noon = document.getElementById('noon');
	const noonOffsetTop = $('#noon').offset().top;
	const noonRain = document.getElementById('noonRain');

	let noonAxisY = seasonAxisY(noon);

	stars.clone().appendTo('#nightRain');

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
		let noonRainAxisY = seasonAxisY(noonRain);
		
		// $("#abc").text(windowHeight*(22/100))
		// $("#hij").text((((6/100) * noonOffsetTop) + windowHeight))
		$("#efg").text(valScrlTop)

		seasonNight($(this), night, moon, stars, mountainsMalam)

		if (valScrlTop > (noonAxisY - (windowHeight*(60/100))) && valScrlTop < ((noonAxisY + (windowHeight*(110/100))) - (windowHeight*(1/400)))) {
			let opacityNight = opacitySeason(noonAxisY, windowHeight) - 0.3;

			sun.css('top', (noonAxisY - (windowHeight*(60/100)))+ 'px');

			mountainsMalam.css('opacity', opacityNight);
		}
	});
});

function seasonNight(WINDOW, night, moon, stars, mountainsMalam) {
	let windowHeight = $(WINDOW).outerHeight(); 
	let valScrlTop = $(WINDOW).scrollTop();
	let nightAxisY = seasonAxisY(night);
	let opacityNight = opacitySeason(nightAxisY, windowHeight);

	if (nightAxisY > (windowHeight*(22/100))) {
		moon.css('top', (nightAxisY - (windowHeight*(60/100)))+ 'px');
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