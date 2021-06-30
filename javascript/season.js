$(document).ready(function() {
	let windowHeight = $(window).height();
	let satuanDeg = windowHeight / 360;
	let seasons = ["night", "noon", "noonRain", "nightRain"];

	for (var i = 0; i < seasons.length; i++) {
		$('<div id="trs-'+i+'" data-trs="'+seasons[i]+'" style="height: '+windowHeight+'px"></div>').insertBefore('#sec')
	}

	$(window).scroll(function(event) {
		// let stars = ;
		// let mountains_behind_malam = document.getElementById('mountains_behind_malam');
		// let mountains_front_malam = document.getElementById('mountains_front_malam');
		let valScrlTop = $(this).scrollTop();
		satuanDeg = satuanDeg + ((windowHeight - valScrlTop) / 360);

		$('#stars').css('bottom', '-'+valScrlTop * 0.25 + 'px');
		// mountains_behind_malam.style.top = valScrlTop * 0.5 + 'px';
		// mountains_front_malam.style.top = valScrlTop * 0 + 'px';
		$('#moon').css('transform', 'rotate(-'+satuanDeg+'deg)');
		$('#text').css('margin-right', valScrlTop * 4 + 'px');
		$('#text').css('margin-top', valScrlTop * 1.5 + 'px');
		$('#btn').css('margin-top', valScrlTop * 1.5 + 'px');
	});
});