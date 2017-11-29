(function(global, $, SM){
  'use strict';
  $( window ).scroll(function() {
    // $output.html( scrolling );
    console.log('scrolling');
    $('.about-content-bg').addClass('about-content-bg-act');
    $('.wow-content-bg').addClass('wow-content-bg-act');
    $('.films-content-bg').addClass('films-content-bg-act');
    $('.wow-content').addClass('scroll-bg');
    $('.about-content').addClass('scroll-bg');
    
    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
      $('.about-content-bg').removeClass('about-content-bg-act');
      $('.wow-content-bg').removeClass('wow-content-bg-act');
      $('.films-content-bg').removeClass('films-content-bg-act');
      $('.wow-content').removeClass('scroll-bg');
      $('.about-content').removeClass('scroll-bg');
    }, 500) );
  });

  $('.order-detail button').on('mouseenter mouseleave', function( event ) {
    $('.usb-content-bg').toggleClass( "usb-content-bg-act" );
  });

  console.log(SM);
  
  var ctrl = new SM.Controller();

  // Scene 설정
  var scene_list = '#wow p, .committee-list, #sponsor ul, #keynote p, #main-poster img, #eve-festival p, #eve-festival-img img'.split(', ');
  var act_list = '.wow-thumb-img img'.split(', ');
  console.log(act_list);
  scene_list.forEach(function (trigger_el, idx) {
    var scroll_el = trigger_el;
    var about_scene = new SM.Scene({
      'triggerElement': trigger_el,
      'triggerHook': 0,
      // 'reverse': false,
      'duration': 700,
      'offset': -800
    })
    .setClassToggle(trigger_el, 'fade-in')
    // .addIndicators()
    .addTo(ctrl)
    .on('enter', function (e) {
      if (idx==3) {
          $('.wow-thumb-img .first').addClass('img-act');
        }
      if (idx==4) {
          $('.wow-thumb-img .second').addClass('img-act');
        }
      if (idx==5) {
          $('.wow-thumb-img .third').addClass('img-act');
        }
      if (idx==6) {
          $('.wow-thumb-img .fourth').addClass('img-act');
        }
    }).on('leave', function (e) {
      if (idx==3) {
          $('.wow-thumb-img .first').removeClass('img-act');
        }
      if (idx==4) {
          $('.wow-thumb-img .second').removeClass('img-act');
        }
      if (idx==5) {
        $('.wow-thumb-img .third').removeClass('img-act');
      }
      if (idx==6) {
        $('.wow-thumb-img .fourth').removeClass('img-act');
      }
    })
    
  });

})(this, this.jQuery, this.ScrollMagic);