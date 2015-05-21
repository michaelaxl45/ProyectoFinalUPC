/* jTweetsAnywhere settings - enter your username. */
/*----------------------------------------------------------------*/
var twitter_user_name = 'nemos_';


/* PrettyPhoto settings */
/*----------------------------------------------------------------*/
function prettyPhoto_settings(){
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'fast', /* fast/slow/normal */
		slideshow: 5000, /* false OR interval time in ms */
		autoplay_slideshow: false, /* true/false */
		opacity: 0.50, /* Value between 0 and 1 */
		show_title: true, /* true/false */
		allow_resize: true, /* Resize the photos bigger than viewport. true/false */
		default_width: 500,
		default_height: 344,
		counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
		theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
		horizontal_padding: 20, /* The padding on each side of the picture */
		hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
		wmode: 'opaque', /* Set the flash wmode attribute */
		autoplay: true, /* Automatically start videos: True/False */
		modal: false, /* If set to true, only the close button will close the window */
		deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
		overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
		keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
		changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
		callback: function(){}, /* Called when prettyPhoto is closed */
		ie6_fallback: true
	});
}


/* Google Maps Settings */
/*----------------------------------------------------------------*/
function google_map(){
	var map_position = new google.maps.LatLng(-37.812471, 144.968918);
    var marker_position = new google.maps.LatLng(-37.8135, 144.97);
    var map;
    var marker;

    var mapOptions = {
        zoom: 14,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        center: map_position
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    marker = new google.maps.Marker({
        map:map,
        animation: google.maps.Animation.DROP,
        position: marker_position
    });
    google.maps.event.addListener(marker, 'click', toggleBounce);

    function toggleBounce() {
	    if (marker.getAnimation() != null) {
	            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}


/* Image hover effect */
/*----------------------------------------------------------------*/
function hover_size(){
	jQuery('.img_hover').each(function(){
		img_width = jQuery(this).find("img").width();
		img_height = jQuery(this).find("img").height();
		
		jQuery("span",this).width(img_width);
		jQuery("span",this).height(img_height);
	});
}

function img_hover(){
	hover_size();
	jQuery(".img_hover").hover(
		function () {
			jQuery("span", this).not(':animated').slideDown(150);
		}, 
		function () {
			jQuery("span", this).slideUp(100);
		}
	);
}


/* Regular expression to validate email address */
/*---------------------------------------------------------------------*/
function validateEmail(emailValue){  
	var emailPattern = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
	return emailPattern.test(emailValue); 
}


/* Validate Form fields */
/*---------------------------------------------------------------------*/
function validateForm(bName, bEmail, bMessage){
	var fields_valid = true;
	
	if (bName && jQuery("input#name").val().length < 1) {
		jQuery("input#name").css('background','#fefeee');
		fields_valid = false;
    }
	if (bEmail && !validateEmail(jQuery("input#email").val())) {
		if(!bMessage) {
			jQuery("label#email_error").fadeIn('slow');
			jQuery("input#email").focus();
		} else {
			jQuery("input#email").css('background','#fefeee');
		}
		fields_valid = false;
    }
	if (bMessage && jQuery("textarea#message").val().length < 1) {
		jQuery("textarea#message").css('background','#fefeee');
		fields_valid = false;
    }
	return fields_valid;
}



/*===================================================*/
/*                    jQuery MAIN                    */
/*===================================================*/

jQuery(function(){

	/* Top Navigation for narrower media screens */
	/*----------------------------------------------------------------*/
	selectnav('top_nav', {
		label: '- Navigation -',
		nested: true,
		indent: '.'
	});


	/* Start RoundAbout slider on main page */
	/*----------------------------------------------------------------*/
	if (jQuery(".roundabout").length){
		jQuery('ul.roundabout').roundabout();
	}


	/* Start Tiny Slider - Team Members widget  */
	/*----------------------------------------------------------------*/
	if (jQuery("#rotatescroll").length){
		jQuery('#rotatescroll').tinycircleslider({ 
			interval: false,
			snaptodots: true,
			radius: 137,
			callback: function(element, index){
				jQuery(".employee").hide().eq(index).fadeIn('slow');
			}
		});
	}
	

	/* Function Calls */
	/*----------------------------------------------------------------*/
	if (jQuery(".img_hover").length){
		jQuery(window).load(function(){img_hover();});
		jQuery(window).resize(function() {hover_size();});
	}

	if (jQuery("a[data-rel^='prettyPhoto']").length){
		prettyPhoto_settings();
	}

	if (jQuery("#map").length){google_map();}


	/* Drop-down Top Navigation */
	/*----------------------------------------------------------------*/
	jQuery("#top_nav li ul li").has("ul").children("a").addClass('arrow_sub_menu');

	jQuery("#top_nav li").has("ul").hover(
		function () {
			jQuery(this).children('a')
				.addClass('active_sub_nav');
			jQuery(this).has("ul:not(.lower_level)").children('a')
				.addClass('active_top_nav');

			sub_navigation = jQuery(this).children('ul');
			sub_navigation.not(':animated').slideDown(150);
		}, 
		function () {
			jQuery(this).children('a')
				.removeClass('active_sub_nav active_top_nav');
			
			jQuery("ul", this).slideUp(50);
		}
	);


	/* Testimonials Rotator */
	/*----------------------------------------------------------------*/
	jQuery(".quotes_buttons a").click(
		function () {
			if (!jQuery(this).hasClass('selected')) {
				quote_id_in = jQuery(this).attr('data-id');
				
				y_offset = -122 * (quote_id_in - 1);
				jQuery(".quotes").animate({top: y_offset}, 600);

				jQuery(".quotes_buttons a").removeClass();
				jQuery(this).addClass('selected');
			}
			return false;
		}
	);


	/* Our Clients widget */
	/*----------------------------------------------------------------*/
	jQuery(".clients_btn").toggle(
		function () {
			jQuery("#top_footer .clients").slideDown(200);
			jQuery(this).addClass("opened");
		}, 
		function () {
			jQuery("#top_footer .clients").slideUp(200);
			jQuery(this).removeClass("opened");
		}
	);


	/* jTweetsAnywhere */
    /*----------------------------------------------------------------*/
	jQuery(".tweetsFeed").jTweetsAnywhere({
		username: twitter_user_name,
		count: 2
	});


	/* Alert Bar and Note Box - close button */
    /*----------------------------------------------------------------*/
	jQuery(".note a, .alert_bar .wrap a").click(
		function(){
			jQuery(this).parent().animate({opacity: 0}, 300).slideUp(200);
			return false;
	});


	/* Tab boxes */
	/*---------------------------------------------------------------------*/
	jQuery(".tabs_container .tab_content").hide();
	jQuery(".tabs_container ul.tabs").find("li:first").addClass("active").show();
	jQuery(".tabs_container").find(".tab_content:first").show();

	jQuery("ul.tabs li").click(function() {
		var tabs_container = jQuery(this).parent().parent();
		var tabs = tabs_container.children(".tabs");
		var tabs_contents = tabs_container.children(".tabs_contents");
		
		tabs.children("li").removeClass("active");
		jQuery(this).addClass("active");
		
		var clicked_li_id = tabs.children("li").index(this);
		var tab_content = tabs_contents.children("div").eq(clicked_li_id);
		
		tabs_contents.children(".tab_content").hide();
		jQuery(tab_content).fadeIn();
		return false;
	});


	/* Toggles slider */
	/*-----------------------------------------------------------------------*/
	jQuery("ul.toggles_slider li span.selected + div").show();
	
	jQuery("ul.toggles_slider li span").click(function() {
		var parent = jQuery(this).parent();
		
		if(!jQuery(this).hasClass('selected')){
			parent.siblings().children(".selected").removeClass('selected');
			jQuery(this).addClass('selected');
			
			parent.siblings().children(".expand:visible").slideUp('fast');
			jQuery(this).next(".expand").slideToggle('fast');
		}
	});


	/* Flex Slider 2 - Single Project page */
    /*---------------------------------------------------------------------*/
    if (jQuery(".flexslider").length){
    	jQuery('.flexslider').flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false
		});
	}


	/* QuickSand plugin */
	/*---------------------------------------------------------------------*/
	var galleryData = jQuery(".portfolio_content").clone();
	
	jQuery(".portfolio_filter li a").click(function() {
		jQuery(".portfolio_filter li a").removeClass("selected");
		jQuery(this).addClass('selected');
		
		var filterClass = jQuery(this).attr('id');
		
		if (filterClass == 'all') {
			var filteredData = galleryData.find('.item');
		} else {
			var filteredData = galleryData.find('.item[data-type~=' + filterClass + ']');
		}
		
		jQuery(".portfolio_content").quicksand(filteredData, {
			adjustHeight: 'dynamic',
			duration: 800,
			easing: 'easeOutSine',
			useScaling: true,
			enhancement: function() {
				hover_size();
				img_hover();
				prettyPhoto_settings();
			}
		});
		return false;
	});


    /* Single Blog Post - scroll to comments */
    /*---------------------------------------------------------------------*/
    jQuery(".comments_num").click(function(){
		jQuery('html, body').animate({
		    scrollTop: jQuery("#comments").offset().top
		}, 800);
	});	


	/* Scroll To Top */
    /*---------------------------------------------------------------------*/ 
	jQuery('#to_top').click(function() {
		jQuery("html:not(:animated), body:not(:animated)").animate({ scrollTop: 0}, 400 );
	});


	/* Slit Slider */
    /*---------------------------------------------------------------------*/ 
	
    if (jQuery(".sl-slider").length){

		var Page = (function() {
			var $nav = $( '#nav-dots > span' ),
				slitslider = $( '#slider' ).slitslider( {
					onBeforeChange : function( slide, pos ) {

						$nav.removeClass( 'nav-dot-current' );
						$nav.eq( pos ).addClass( 'nav-dot-current' );

					}
				} ),

				init = function() {
					initEvents();
				},
				initEvents = function() {

					$nav.each( function( i ) {
					
						$( this ).on( 'click', function( event ) {
							
							var $dot = $( this );
							
							if( !slitslider.isActive() ) {

								$nav.removeClass( 'nav-dot-current' );
								$dot.addClass( 'nav-dot-current' );
							
							}
							slitslider.jump( i + 1 );
							return false;
						});
					});
				};
				return { init : init };
		})();

		Page.init();
	}


	/* Subscribe Form on fly validation */
    /*---------------------------------------------------------------------*/
    jQuery("input#email").bind("keyup focusout", function(){
		if(validateEmail(jQuery(this).val())){
			jQuery("label#email_error").not(':animated').fadeOut('fast');
        } else if(jQuery(this).val()){
			jQuery("label#email_error").fadeIn('fast'); 
        } else {
            jQuery(".placeholder").fadeIn('fast');
			jQuery(".error").hide();
        }
	});


	/* Submitting Subscribe Form using AJAX */
    /*---------------------------------------------------------------------*/
	jQuery("form#subscribe").submit(function() {
        
		var dataString = jQuery(this).serialize();
        
		if(validateForm(0,1,0)){
			jQuery.ajax({
			type: "POST",
			url: "php/subscribe.php",
			data: dataString,
			success: function() {
				jQuery('#subscribe').fadeOut('slow', function(){
                    jQuery(this).html("<div id='confirm'></div>");
                    jQuery('#confirm').html("Request Submitted Successfully! Thank you.")
					.addClass('request_success');
                    jQuery(this).fadeIn('slow');
                })
			}
			});
		}
		return false;
	});


	/* Contact Form - remove cross sign on focus */
    /*---------------------------------------------------------------------*/
    jQuery("#contact input, #contact textarea")
	    .focus(function(){
	    	jQuery(this).css('background','#f7f9fc');
		})
		.focusout(function(){
	    	jQuery(this).css('background','#f2f4f5');
	});



	/* Submitting Contact Form using AJAX */
    /*---------------------------------------------------------------------*/
	jQuery("form#contact").submit(function() {
        
		var dataString = jQuery(this).serialize();
        
		if(validateForm(1,1,1)){
			jQuery.ajax({
			type: "POST",
			url: "php/send_mail.php",
			data: dataString,
			success: function() {
				jQuery('#contact').slideUp('slow', function(){
                    jQuery(this).html("<div id='confirmation'></div>");
                    jQuery('#confirmation').html("<h3>Message Submitted Successfully!</h3>")
				    .append("<p>Thank you for contacting us. We will be in touch with you very soon.</p>");
                    jQuery(this).slideDown('slow');
                })
			}
			});
		}
		return false;
	});
})