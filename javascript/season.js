$(document).ready(function() {
	window.mobileCheck = function() {
	  let check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

	  return check;
	};

	const moon = $("#moon");
	const sun = $("#sun");
	const stars = $("#stars");
	const mountainsMalam = $(".mountains_malam");
	const mountainsSiang = $(".mountains_siang");
	const seasons = ["night", "noon", "noonRain", "nightRain"];
	const pointsForScrollSeason = [0, 18.264, 45.66, 60.89];
	const idSees = ["#seeNight", "#seeNoon", "#seeNoonRain", "#seeNightRain"];

	let windowHeight = $(window).outerHeight();
	let ntahApa = 0;

	const night = document.getElementById('night');
	const noon = document.getElementById('noon');
	const noonRain = document.getElementById('noonRain');
	const noonRainOffsetTop = $('#noonRain').offset().top;
	const nightRainOffsetTop = $('#nightRain').offset().top;

	let noonAxisY = seasonAxisY(noon);
	let noonRainAxisY = seasonAxisY(noonRain);
	let valScrlTop = $(window).scrollTop();

	$(window).resize(function(event) {
		windowHeight = $(window).outerHeight(); 
		valScrlTop = $(this).scrollTop();
		noonAxisY = seasonAxisY(noon);

		seasonNight($(this), night, moon, stars, mountainsMalam)
		noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun)
		seasonNoonRainUntilNightRain($(this), noon, noonRain, nightRain, nightRainOffsetTop, noonRainOffsetTop)
	})

	$(window).scroll(function(event) {
		windowHeight = $(window).outerHeight(); 
		valScrlTop = $(this).scrollTop();
		noonAxisY = seasonAxisY(noon);
		noonRainAxisY = seasonAxisY(noonRain);
		nightRainAxisY = seasonAxisY(noonRain);

		for (var i = 0; i < pointsForScrollSeason.length; i++) {
			if ($("html, body").scrollTop() >= scrollPointForEverySeason(pointsForScrollSeason[i])) {
				$("header .big-nav a").removeClass('active');
				$(idSees[i]).addClass('active');
			}
		}

		lazyLoadingImgSeason(valScrlTop);
		seasonNight($(this), night, moon, stars, mountainsMalam)
		seasonNoonUntilNoonRain($(this), noon, noonRain, sun, mountainsMalam, noonRainOffsetTop, nightRainOffsetTop);
		seasonNoonRainUntilNightRain($(this), noon, noonRain, nightRain, nightRainOffsetTop, noonRainOffsetTop)
	});

	$("header a:not(.logo)").click(function() {
		let idSee = $(this).attr('id');
		let valScrollTop = 0;

		switch(idSee) {
			case "seeSmallNav":
				$(this).toggleClass('active');

				if ($(this).hasClass('active')) {
					$(".big-nav").show('fast');
				} else {
					$(".big-nav").hide('fast');
				}
			break;
			case "seeNight":
				valScrollTop = 0;
				$("title").text('Season - Night');
			break;
			case "seeNoon":
				valScrollTop = scrollPointForEverySeason(33.485);
				$("title").text('Season - Noon');
			break;
			case "seeNoonRain":
				valScrollTop = scrollPointForEverySeason(45.66);
				$("title").text('Season - Noon Rain');
			break;
			case "seeNightRain":
				valScrollTop = scrollPointForEverySeason(80);
				$("title").text('Season - Night Rain');
			break;
			default:
				if ($(this).hasClass('active-info')) {
					$("#about").css('opacity', '0');
					$(this).removeClass('active-info')
					$(this).text('About')
				} else {
					$("#about").css('opacity', '1');
					$(this).addClass('active-info')
					$(this).text('Close')
				}

				$("html, body").scrollTop($("html, body").scrollTop() + 1);
			break;
		}

		$("header .big-nav a").removeClass('active');

		if (idSee == "seeNight" || idSee == "seeNoon" || idSee == "seeNoonRain" || idSee == "seeNightRain") {
			$(this).addClass('active');

			$("#seeInfo").text('About')
			$("#seeInfo").removeClass('active-info');
			$("#about").css('opacity', '0');
			
			$("html, body").animate({scrollTop: valScrollTop}, 0.5)
		}

		return false;
	});

	$("html, body").animate({scrollTop: 0}, 0.5);

	if (window.mobileCheck()) {
		alert("Kami mendeteksi perangkat yang Anda gunakan adalah Mobile, kami menyarankan membuka website ini menggunakan Desktop");
	}
});

function lazyLoadingImgSeason(valScrlTop) {
	if (valScrlTop >= scrollPointForEverySeason(30.44)) {
		if ($(".summer-clouds").hasClass('def-img')) {
			$(".summer-clouds").removeClass('def-img');

			$(".summer-clouds-sc1").attr('src', 'images/summer cloud 1.png');
			$(".summer-clouds-sc2").attr('src', 'images/summer cloud 2.png');
			$(".summer-clouds-sc3").attr('src', 'images/summer cloud 3.png');
			$(".summer-clouds-sc4").attr('src', 'images/summer cloud.png');
		}
	} 

	if (valScrlTop >= scrollPointForEverySeason(40)) {
		if ($(".night-clouds").hasClass('def-img')) {
			$(".night-clouds").removeClass('def-img');

			$(".night-clouds:not('.dark-clouds')").attr('src', 'images/night cloud.png');
			$(".dark-clouds").attr('src', 'images/dark cloud2.png');
			$(".rain_front").attr('src', 'images/rain1.gif');
		}
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
	}

}

function seasonNoonRainUntilNightRain(windoww, noon, noonRain, nightRain, nightRainOffsetTop, noonRainOffsetTop) {
	let windowHeight = windoww.outerHeight(); 
	let valScrlTop = windoww.scrollTop();
	let noonRainAxisY = seasonAxisY(noonRain);
	let nightRainAxisY = seasonAxisY(nightRain);
	let noonAxisY = seasonAxisY(noon);

	if (valScrlTop < ((noonRainOffsetTop * (200/100)) - windowHeight) && valScrlTop > windowHeight) {
		let opacityNoon = opacitySeason(noonRainAxisY, windowHeight) - 0.3;		

		$(".mountains_siang").css('opacity', opacityNoon);
	} 

	if (valScrlTop > noonRainOffsetTop) {
		let opacityNoonRain = opacitySeason(nightRainAxisY, windowHeight) - 0.3;		

		$(".mountains_siang_rain").css('opacity', opacityNoonRain);

		$("#sun").css('top', ((noonRainAxisY/3) - (windowHeight*(30/100)))+ 'px');
	}

	if (valScrlTop >= scrollPointForEverySeason(40)) {
		let opacityHujan = opacitySeason(valScrlTop, windowHeight) - 0.3;

		$(".rain_front").css('opacity', opacityHujan);
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
	} else {
		$(".rain_front").css('opacity', 0);
	}
}

function noonSunPosition(valScrlTop, noonAxisY, windowHeight, sun) {
	if (valScrlTop < noonAxisY) {		
		sun.css('top', ((noonAxisY/2) - (windowHeight*(30/100)))+ 'px');
	} else if (valScrlTop > noonAxisY) {
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

function scrollPointForEverySeason(point) {
	return (point / 100) * $(document).outerHeight();
}