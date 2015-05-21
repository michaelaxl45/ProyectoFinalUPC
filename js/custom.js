jQuery(document).ready(function($) {
   'use strict';

//Portfolio Isotope code
if (jQuery().isotope){
var tempvar = "all";
$(window).load(function(){
	$(function (){
	var isotopeContainer = $('.isotope-container'),
	isotopeFilter = $('#filter'),
	isotopeLink = isotopeFilter.find('a');
	isotopeContainer.isotope({
	itemSelector : '.isotope-item',
	//layoutMode : 'fitRows',
	filter : '.' +tempvar,
	masonry:  {
	columnWidth:    1,
	isAnimated:     true,
	isFitWidth:     true
	}
	});
	isotopeLink.click(function(){
	var selector = $(this).attr('data-category');
	isotopeContainer.isotope({
	filter : '.' + selector,
	itemSelector : '.isotope-item',
	//layoutMode : 'fitRows',
	animationEngine : 'best-available'
	});
	isotopeLink.removeClass('active');
	$(this).addClass('active');
	return false;
	});
	});
	$("#filter ul li a").removeClass('active');
	$("#filter ul li."+tempvar+ " a").addClass('active');
	});
}




 // Portfolio Hover
$('.item-container').hover(function(){
  $(this).find('img').fadeTo(500,0.6);
  $(this).find('a.link_to_image, a.link_to_video').css({'left':'-50px','display':'block'}).stop().animate({'left':'30%', opacity:1},600);
    $(this).find('a.dragable-slider, a.link_to_video').css({'left':'-50px','display':'block'}).stop().animate({'left':'45%', opacity:1},600);

  $(this).find('a.link_to_post').css({'right':'-50px','display':'block'}).stop().animate({'right':'30%',opacity:1},600);
 
},function(){
  $(this).find('img').fadeTo(500,1);
  $(this).find('a.link_to_image, a.link_to_video').css({'left':'50','display':'block'}).stop().animate({'left':'-30%',opacity:0},600);
    $(this).find('a.dragable-slider, a.link_to_video').css({'left':'50','display':'block'}).stop().animate({'left':'-30%',opacity:0},600);
  $(this).find('a.link_to_post').css({'right':'50px','display':'block'}).stop().animate({'right':'-30%',opacity:0},600);
});

	
// Responsive Menu Nav
  $("<select />").appendTo(".menu");
    // Create default option "Go to..."
    $("<option />", {
    "selected": "selected",
    "value"   : "",
    "text"    : "Go to..."
    }).appendTo(".menu select");

  // Populate dropdowns with the first menu items
  $(".menu ul li a").each(function() {
  var el = $(this);
  if($(this).parents("ul.sub-menu").length > 0){
  $("<option />",{
  "value"   : el.attr("href"),
  //"text"    : '\xa0'+ '\xa0'+ '\xa0'+ el.text()
  "text"    : " -- "+ el.text()
  }).appendTo(".menu select");
  }else{
  $("<option />", {
  "value"   : el.attr("href"),
  "text"    : el.text()
  }).appendTo(".menu select");
  }
  });

  
  //make responsive dropdown menu actually work     
  $(".menu select").change(function() {
  window.location = $(this).find("option:selected").val();
  });

  if($('body')[0].scrollHeight > $(window).height()){
        $('footer').addClass("scrollbar"); 
    }else{
      $('footer').removeClass("scrollbar");
    }
});     
