$(document).ready(function() {
	let windowHeight = $(window).height();
	let satuanDeg = windowHeight / 360;
	let countSeason = 1;
	let moon = $("#moon");
	let seasons = ["night", "noon", "noonRain", "nightRain"];

	for (var i = 0; i < seasons.length; i++) {
		$('<div id="'+seasons[i]+'" style="height: '+windowHeight+'px"></div>').insertBefore('#sec')
	}

	$("#stars").clone().appendTo('#nightRain');

	$(window).scroll(function(event) {
		let valScrlTop = $(this).scrollTop();
		$("#efg").text(valScrlTop)

		$("#abc").text((valScrlTop/windowHeight))
		
		if (valScrlTop <= $("#night").offset().top || valScrlTop >= $("#nightRain").offset().top) {
			moon.css('transform', 'rotate(-'+(valScrlTop / (satuanDeg*3.25)) * satuanDeg+'deg) translate(0px, -100px)');

			countSeason = (countSeason > 0) ? countSeason-- : 0;
		} else {
			countSeason++;
		}

		$('#stars').css('bottom', '-'+valScrlTop * 0.25 + 'px');
		$('#text').css('margin-right', valScrlTop * 4 + 'px');
		$('#text').css('margin-top', valScrlTop * 1.5 + 'px');
		$('#btn').css('margin-top', valScrlTop * 1.5 + 'px');
	});
});