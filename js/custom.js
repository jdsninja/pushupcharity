$(function () {
	var Screen_width = window.innerWidth || document.documentElement.clientWidth,
		Screen_height = window.innerHeight || document.documentElement.clientHeight;

	$(window).resize(function() {
		Screen_width = window.innerWidth || document.documentElement.clientWidth;
		Screen_height = window.innerHeight || document.documentElement.clientHeight;
	});

	$('#ri-grid').gridrotator({
		rows: 2,
		columns: 15,
		animType: 'fadeInOut',
		animSpeed: 1000,
		interval: 600,
		step: 1,
		w320: {
			rows: 3,
			columns: 4
		},
		w240: {
			rows: 3,
			columns: 4
		}
	});

	//get latest tweets
	$('.btn.get-map').on('click', function(){
		$(this).animate({'left': 440}, 500);
		$('.map').animate({'left': 0}, 500);
	});

	/**
	 * Stock the form to the top when user scroll down
	 */
	window.onload = function () {
		//var headers = document.querySelectorAll('#docs h2, #guide h1');
		if(Screen_width > 959){
			var menu = document.getElementById('block3');
			if(menu !== null){
				var init = menu.offsetTop  + 760;
				var docked;
				window.onscroll = function () {
					if (!docked && ((menu.offsetTop + 760) - scrollTop() < 0)) {
						$(".validation input").blur();
						$("#actionCtn").addClass('docked');
						$("#actionCtn").css('top','-100px').animate({top:0});
						docked = true;
					} else if (docked && scrollTop() <= init) {
						$("#actionCtn").animate({top:-100}, function(){
							$("#actionCtn").removeClass('docked');
						});
						docked = false;
					}
				};
			}
		}
	};

	function scrollTop() {
		return document.body.scrollTop || document.documentElement.scrollTop;
	}

	/**
	 * Form
	 */

	function sendEmail(param, type){
		var jqxhr = $.post("mail.service.json.php",
			param,
			function(data){
			}, "json")
			.error(function() {
				//console.log("Communication error, try again later.");
			})
			.complete(function() {
				// for testing purpose
				if(type == 'apply'){
					$('#applyToCompete .modal-body form').remove();
					$('#applyToCompete .modal-body').html('<div style="text-align: center;font-size: 50px;color: #FFF;">Thank you!</div>');
				}else if(type == 'questions'){
					$('#formSubmitQuestions').empty();
					$('#formSubmitQuestions').html('<div style="text-align: center;font-size: 50px;color: #FFF;">Thank you!</div>');
				}
			});
	}

	function validateEmail(email) {
		// http://stackoverflow.com/a/46181/11236
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function formValidate(form){
		var type = form.data("form-type"),
			param = {},
			error = 0;


		// submit = email
		// apply = name, email
		// buy = email
		// questions = name, email, message
		param.type = type;
		if(type == 'submit'){
			param.email =  $("#email", form).val();
		}else if(type == 'apply'){
			param.name = $("#name", form).val();
			param.email =  $("#email", form).val();
		}else if(type == 'buy'){
			param.email =  $("#email", form).val();
		}else if(type == 'questions'){
			param.name = $("#name", form).val();
			param.email =  $("#email", form).val();
			param.msg = $("#message", form).val();
		}

		// Validate email
		if (validateEmail( param.email )) {
			$("#email", form).removeClass("error");
		} else {
			$("#email", form).addClass("error");
			error = 1;
		}

		// Validate name
		if(type == 'apply' || type == 'questions'){
			if (  $.trim(param.name).length > 0  ) {
				$("#name", form).removeClass("error");
			} else {
				$("#name", form).addClass("error");
				error = 1;
			}
		}

		// Validate message
		if(type == 'questions'){
			if (  $.trim(param.msg).length > 0 ) {
				$("#message", form).removeClass("error");
			} else {
				$("#message", form).addClass("error");
				error = 1;
			}
		}

		if(!error){
			sendEmail(param, type);
		} else {
		}
	}

	$(".btn.submit", 'form').on('click', function(evt){
		//alert('try submit');
		evt.preventDefault();

		var form = $(this).parents('form');
		formValidate(form);
	});
});

// GOOGLE ANALYTIC
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-40864323-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();