
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

// about 탭

$(document).ready(
  function() {
    var intro_tab = $('.intro-tab');
    var wow_tab = $('.wow-tab');
    var committee_tab = $('.committee-tab');
    var sponsor_tab = $('.sponsor-tab');


    var tab = $('.about li a');
    var scroll_down = $('.fa-angle-down');
    
    var act_tab = function() {
      var tab_group = $(this).parent().siblings().children();
      var scrollPosition = $($(this).attr('data-target')).offset().top;

      if (tab_group.hasClass('about-act')) {
        tab_group.removeClass('about-act');
        $(this).addClass('about-act');
        $('html, body').animate({
          scrollTop: scrollPosition
        });
      }else{
        $(this).addClass('about-act');
        $('html, body').animate({
          scrollTop: scrollPosition
        });
      }
    }
  
    tab.click(act_tab);
    scroll_down.click(act_tab)
  }
);