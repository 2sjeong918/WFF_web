(function(global, $, SM){
  'use strict';
  // scroll magic

  // Controller 설정
  var ctrl = new SM.Controller();

  // 핀설정
  var intro_pin = new SM.Scene({
    'triggerElement': '#intro',
    'triggerHook' : 0,
    'duration' : 600
  });
  intro_pin
    .setPin('#intro', {'pushFollowers': false})
    .addTo(ctrl)
    .addIndicators({
      'name': 'intro pin'
    })
    .on("end", function (e) {
      e.target.removePin(true);
  });
  // Scene 설정
  var scene_list = '#intro img, #wow img, .committee-list, #sponsor ul'.split(', ');
  scene_list.forEach(function (trigger_el, idx) {
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
    .on("progress", function (e) {
      console.log(e.progress);
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