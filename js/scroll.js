(function(global, $, SM){
  'use strict';
  // scroll magic

  // Controller 설정
  var ctrl = new SM.Controller();
  var intro_pin = new SM.Scene({
    'triggerElement': '#intro',
    'triggerHook' : 0,
    // 'duration' : '100%'
  });
  intro_pin
    .setPin('#intro', {'pushFollowers': false})
    .addTo(ctrl)
    .addIndicators({
      'name': 'intro pin'
    })
  // Scene 설정
  var scene_list = '#wow, #committee, #sponsor'.split(', ');
  scene_list.forEach(function (trigger_el, idx) {
    var about_scene = new SM.Scene({
      'triggerElement': trigger_el,
      'triggerHook': 0,
      // 'reverse': false,
      'offset': -500
    })
    .setClassToggle(trigger_el, 'fade-in')
    .addIndicators()
    .addTo(ctrl);
    
  });

})(this, this.jQuery, this.ScrollMagic);