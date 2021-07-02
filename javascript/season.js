$(document).ready(function() {
	let windowHeight = $(window).outerHeight();
	let satuanDeg = windowHeight / 185;
	let opacityNight = 1;
	let moon = $("#moon");
	let seasons = ["night", "noon", "noonRain", "nightRain"];
	
	// satuanDeg = roundSatuanDeg - decimalsSatuanDeg;

	// const round = (number, decimalPlaces) => {
	// 	const factorOfTen = Math.pow(10, decimalPlaces)
	// 	return Math.round(number * factorOfTen) / factorOfTen
	// }

	for (var i = 0; i < seasons.length; i++) {
		$('#'+seasons[i]).height(windowHeight);
	}

	$("#stars").clone().appendTo('#nightRain');

	$(window).scroll(function(event) {
		let valScrlTop = $(this).scrollTop();
		const nightYaxis = document.getElementById("night").getBoundingClientRect().top;
		// let a = (($("body").height() / $(this).outerHeight()) * 2 ) ;

		opacityNight = (((nightYaxis/2) / windowHeight) * 100) / 100;
		
		// $("#abc").text(valScrlTop)
		$("#hij").text(opacityNight)
		$("#efg").text(nightYaxis)



		if (nightYaxis > (windowHeight*(22/100))) {
			moon.css('bottom', (nightYaxis - (windowHeight*(30/100)))+ 'px');
		}

		$('#stars').css('bottom', '-'+valScrlTop * 0.25 + 'px');
		$('#text').css('margin-right', valScrlTop * 4 + 'px');
		$('#text').css('margin-top', valScrlTop * 1.5 + 'px');
		$('#btn').css('margin-top', valScrlTop * 1.5 + 'px');
	});
});