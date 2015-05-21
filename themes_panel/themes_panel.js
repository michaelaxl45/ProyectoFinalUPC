$.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


jQuery(function(){
	

	/* Fixes for IE7, IE8 */
	/*-----------------------------------------------------------------------*/
	if ($.browser.msie && $.browser.version.substr(0,1)<=8) {
		jQuery("#themes_menu, #toggle_button").css('border','1px solid #ccc');
		jQuery("#toggle_button").css({'border-left':'none', 'margin-top':'0px'});
	}
	
	
	/* Show or hide themes panel
	----------------------------------------------------------*/
	themes_panel_width = jQuery('#themes_menu').outerWidth();
	ofset = 4;
	
	jQuery('#themes_panel').css('left', 0);
	jQuery('#themes_panel').animate({left: -themes_panel_width + ofset}, 400);
	
	jQuery('#toggle_button').click(function() {
		
		var themes_panel = jQuery(this).parent();
		themes_panel.animate({
		  left: parseInt(themes_panel.css('left'),10) == 0 ? -themes_panel_width + ofset : 0
		}, 400);
		
		return false;
	});
	
	
	/* If cookie exists, apply classes from cookie
	----------------------------------------------------------*/
	if ($.cookie('bloom-color') != null)	{
		$.cookie('bloom-color',$.cookie('bloom-color'),{ expires: 0, path: '/'});
		jQuery('body').removeAttr('id').attr('id',$.cookie('bloom-color'));
	}

	if ($.cookie('bloom-pattern') != null)	{
		$.cookie('bloom-pattern',$.cookie('bloom-pattern'),{ expires: 0, path: '/'});
		jQuery('body').removeClass('').addClass($.cookie('bloom-pattern'));
	}
	
	
	/* Change theme colors on click and set cookie
	----------------------------------------------------------*/
	jQuery('#themes_panel ul.theme.buttons li a').click(function(){
		var theme_name = jQuery(this).attr('title');
		
		$.cookie('bloom-color', theme_name, { expires: 0, path: '/'});
		jQuery('body').removeAttr('id').attr('id',theme_name);
		
	  	return false;
    });


    /* Change pattern on click and set cookie
	----------------------------------------------------------*/
	jQuery('#themes_panel ul.pattern.buttons li a').click(function(){
		var pattern_name = jQuery(this).attr('title');
		
		$.cookie('bloom-pattern', pattern_name, { expires: 0, path: '/'});
		jQuery('body').removeClass().addClass(pattern_name);
		
	  	return false;
    });
	
	
	/* Reset to Default
	----------------------------------------------------------*/
	jQuery('.reset_btn').click(function(){
		$.cookie('bloom-color', null, { expires: 0, path: '/'});
		$.cookie('bloom-pattern', null, { expires: 0, path: '/'});
		location.reload();
	});
	
});