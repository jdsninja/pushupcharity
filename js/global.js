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
	/*$.getJSON("https://api.twitter.com/1/statuses/user_timeline/user_timeline.json?count=1&include_rts=1&callback=?", function(data) {
		$("#twitter").html(data[0].text);
	}); */
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
			var menu = document.getElementById('actions');
			if(menu !== null){
				var init = menu.offsetTop  + 560;
				var docked;
				window.onscroll = function () {
					if (!docked && ((menu.offsetTop + 560) - scrollTop() < 0)) {
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
	//$("input, textarea", context).placeholder();
	/*$(".contact-filters", context).find("a").click(function(evt){
		evt.preventDefault();
		$(".contact-filters", context).find("a").removeClass("active");
		$(this).addClass("active");
		var rel = $(this).attr("rel");
		$(".form",context).data("form-type", rel).attr("data-form-type", rel);
		$(".form",context).find(".field").removeClass("error");
		$(".wrapper span",context).html("<div class='dot2'></div>All field required.").css("color", "#3c3f45");
		if(rel === "hello"){
			$("#company").parents(".field").slideUp();
			$("#budgetField").slideUp();
			$("#email").parents(".field").animate({ backgroundColor: "#3c3f45" },{ duration: 200 });
			$("#desc").css("display","none");
			$("#msg").css("display","block");
		} else {
			$("#email").parents(".field").animate({ backgroundColor: "#33363c" },{ duration: 200 });
			$("#company").parents(".field").slideDown();
			$("#budgetField").slideDown();
			$("#desc").css("display","block");
			$("#msg").css("display","none");
		}
		formValidate();
	});*/


	function sendEmail(param){
		var jqxhr = $.post("mail.service.json.php",
			param,
			function(data){
				if(data.status === "ok"){
					console.log('Thank you!');
				} else {
					console.log("Malfunction, try again later.", data);
				}
			}, "json")
			.error(function() {
				console.log("Communication error, try again later.");
			})
			.complete(function() {
				// for testing purpose
				console.log('thank you');
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
			sendEmail(param);
		} else {
		}
	}

	/*$("input,textarea", context).keyup(function(){
		formValidate();
	});*/

	$(".btn.submit", 'form').on('click', function(evt){
		//alert('try submit');
		evt.preventDefault();

		var form = $(this).parents('form');
		formValidate(form);

		//$(".required-note").fadeIn(400).text("Processing...").css("color", "green");

		/*
		var param = {};
		param.name = $("#name").val();
		param.email =  $("#email").val();
		param.type = type;
		param.msg = $("#msg").val();

		var jqxhr = $.post("mail.service.json.php",
			param,
			function(data){
				if(data.status === "ok"){
					console.log('Thank you!');
				} else {
					console.log("Malfunction, try again later.");
				}
			}, "json")
			.error(function() {
				console.log("Communication error, try again later.");
			})
			.complete(function() {
				// for testing purpose
				console.log('thank you');
			});
			*/
	});

});