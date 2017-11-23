(function(global, $, SM){
  'use strict';
  // jquery scroll
  // $(window).scroll(function(e) {
  //   console.log(e.data);
  //   $('.about-content-bg').css( "backgroundColor", "#fff101" );
  // });
  $( window ).scroll(function() {
    // $output.html( scrolling );
    console.log('scrolling');
    $('.about-content-bg').css( {"backgroundImage" :"url('../imgs/about-bg-act.svg')"});
    $('.wow-content-bg').css( {"backgroundImage" :"url('../imgs/wow-bg-act.svg')"});
    $('.films-content-bg').css( {"backgroundImage" :"url('../imgs/films-bg-act.svg')"});
    $('.usb-content-bg').css( {"backgroundImage" :"url('../imgs/usb-bg-act.svg')"});
    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
      $('.about-content-bg').css( {"backgroundImage" :"linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('../imgs/about-bg.svg')"});
      $('.wow-content-bg').css( {"backgroundImage" :"linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('../imgs/wow-bg.svg')"});
      $('.films-content-bg').css( {"backgroundImage" :"url('../imgs/films-bg.svg')"});
      $('.usb-content-bg').css( {"backgroundImage" :"linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('../imgs/usb-bg.svg')"});
    }, 500) );
  });

  // global.onscroll = function(e) {
  //   console.log(e);
  //   console.log("scrolling");
  //   if (e) {
  //     $('.about-content-bg').css( "backgroundColor", "#fff101" ), 0.3;
  //   }else{
  //     $('.about-content-bg').css( "backgroundColor", "#fff" );
  //   }
  // };

  // scroll magic

  // Controller 설정
  var ctrl = new SM.Controller();

  // Scene 설정
  var scene_list = '#intro img, #wow .wow-img, .committee-list, #sponsor ul'.split(', ');
  scene_list.forEach(function (trigger_el, idx) {
    // console.log(trigger_el);
    var scroll_el = trigger_el;
    var about_scene = new SM.Scene({
      'triggerElement': trigger_el,
      'triggerHook': 0,
      // 'reverse': false,
      'duration': 600,
      'offset': -500
    })
    .setClassToggle(trigger_el, 'fade-in')
    .addIndicators()
    .addTo(ctrl)
    .on('progress', function (e) {
      // console.log(e.progress);
      if (0 < e.progress) {
        if (idx==0) {
          $('.intro-tab').addClass('about-act');
        }
        if (idx==1) {
          $('.wow-tab').addClass('about-act');
        }
        if (idx==2) {
          $('.committee-tab').addClass('about-act');
        }
        if (idx==3) {
          $('.sponsor-tab').addClass('about-act');
        }
      }
      if (e.progress === 1 || e.progress === 0) {
        if (idx==0) {
          $('.intro-tab').removeClass('about-act');
        }
        if (idx==1) {
          $('.wow-tab').removeClass('about-act');
        }
        if (idx==2) {
          $('.committee-tab').removeClass('about-act');
        }
        if (idx==3) {
          $('.sponsor-tab').removeClass('about-act');
        }
      }
    });
    
  });

})(this, this.jQuery, this.ScrollMagic);