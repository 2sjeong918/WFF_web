(function(global, $) {
  'use strict';
  $(document).ready(function() {

    var about_tab = $('.about-tab');
    var wow_tab = $('.wow-tab');
    var professor_tab = $('.professor-tab');
    var committee_tab = $('.committee-tab');
    var sponsor_tab = $('.sponsor-tab');
  })

})//(window, window.jQuery);

// 메뉴

$(document).ready(
  function () {
    var container = $('.menubar-container');
    var btn = $('.btn-menubar');
    var menubar = $('.menubar');
    var btn_menubar = $('.btn-menubar, .menubar');
    var menu = $('.main-menu');
    var last = $('.main-menu > li:last-child a');

    btn_menubar.click(function () {
      container.toggleClass('menubar-act');
      menu.toggleClass('menu-act');
      if (menu.hasClass('menu-act')) {
        btn.text('메인메뉴 닫기');
      }else{
        btn.text('메인메뉴 열기');
      }
    });
    last.focusout(function () {
      menu.removeClass('menu-act');
      container.removeClass('menubar-act');
    })
  }
);