$(document).ready(function() {
	let windowHeight = $(window).outerHeight();
	let satuanDeg = windowHeight / 185;
	let roundSatuanDeg = Math.floor(satuanDeg);
	let decimalsSatuanDeg = satuanDeg - roundSatuanDeg;
	let moon = $("#moon");
	let seasons = ["night", "noon", "noonRain", "nightRain"];
	
	satuanDeg = roundSatuanDeg - decimalsSatuanDeg;

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
		let a = (($("body").height() / $(this).outerHeight()) * satuanDeg) - satuanDeg;

		$("#hij").text(nightYaxis)
		$("#efg").text(satuanDeg)

		$("#abc").text(a)

		if (valScrlTop <= $("#night").offset().top || valScrlTop >= $("#nightRain").offset().top) {
			moon.css('transform', 'rotate(-'+(valScrlTop / a)  * satuanDeg+'deg) translate(0px, -100px)');
			// moon.css('transform', 'rotate(-'+(valScrlTop / (satuanDeg*($(document).height() / windowHeight))) * satuanDeg+'deg) translate(0px, -100px)');
		}

		$('#stars').css('bottom', '-'+valScrlTop * 0.25 + 'px');
		$('#text').css('margin-right', valScrlTop * 4 + 'px');
		$('#text').css('margin-top', valScrlTop * 1.5 + 'px');
		$('#btn').css('margin-top', valScrlTop * 1.5 + 'px');
	});
});