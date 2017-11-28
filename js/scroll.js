(function(global, $, SM){
  'use strict';
  $( window ).scroll(function() {
    // $output.html( scrolling );
    console.log('scrolling');
    $('.about-content-bg').addClass('about-content-bg-act');
    $('.wow-content-bg').css( {"backgroundImage" :"url('../imgs/wow-bg-act.svg')"});
    $('.films-content-bg').addClass('films-content-bg-act');
    // $('.usb-content-bg').addClass('usb-content-bg-act');
    
    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
      $('.about-content-bg').removeClass('about-content-bg-act');
      $('.wow-content-bg').css( {"backgroundImage" :"linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('../imgs/wow-bg.svg')"});
      $('.films-content-bg').removeClass('films-content-bg-act');
      // $('.usb-content-bg').removeClass('usb-content-bg-act');
    }, 500) );
  });

  $('.order-detail button').on('mouseenter mouseleave', function( event ) {
    $('.usb-content-bg').toggleClass( "usb-content-bg-act" );
  })

  
  var ctrl = new SM.Controller();

  // Scene 설정
  var scene_list = '#wow p, .committee-list, #sponsor ul, #keynote p, #main-poster img, #eve-festival p'.split(', ');
  scene_list.forEach(function (trigger_el, idx) {
    // console.log(trigger_el);
    var scroll_el = trigger_el;
    var about_scene = new SM.Scene({
      'triggerElement': trigger_el,
      'triggerHook': 0,
      // 'reverse': false,
      'duration': 700,
      'offset': -800
    })
    .setClassToggle(trigger_el, 'fade-in')
    .addIndicators()
    .addTo(ctrl)
    // .on('progress', function (e) {
    //   // console.log(e.progress);
    //   if (0 < e.progress) {
    //     if (idx==0) {
    //       $('.intro-tab').addClass('about-act');
    //     }
    //     if (idx==1) {
    //       $('.wow-tab').addClass('about-act');
    //     }
    //     if (idx==2) {
    //       $('.committee-tab').addClass('about-act');
    //     }
    //     if (idx==3) {
    //       $('.sponsor-tab').addClass('about-act');
    //     }
    //   }
    //   if (e.progress === 1 || e.progress === 0) {
    //     if (idx==0) {
    //       $('.intro-tab').removeClass('about-act');
    //     }
    //     if (idx==1) {
    //       $('.wow-tab').removeClass('about-act');
    //     }
    //     if (idx==2) {
    //       $('.committee-tab').removeClass('about-act');
    //     }
    //     if (idx==3) {
    //       $('.sponsor-tab').removeClass('about-act');
    //     }
    //   }
    // });
    
  });

})(this, this.jQuery, this.ScrollMagic);