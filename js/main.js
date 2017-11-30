
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

// 탭 이동

(function(global, $){
  'use strict';
  var $menu = $('.tab li'),
      $menu_a = $('.tab li a'),
      $scroll_down = $('.scroll-down'),
      $contents = $('.scroll'),
      $doc = $('html, body')
  
      $menu.on('click', 'a', function (e) {

        var $target = $(this).parent(),
            idx = $target.index(),
            section = $contents.eq(idx),
            offsetTop = section.offset().top;
        $(this).addClass('tab-act');
        $doc.stop().animate({ scrollTop :offsetTop }, 500);
        return false;
      });
      
      $scroll_down.on('click', function (e) {
        var offsetTop = $('#film01').offset().top;
        $doc.stop().animate({ scrollTop :offsetTop }, 500);
        return false;
      });

      $(window).scroll(function(){
        var scltop = $(window).scrollTop();
        $.each($contents, function(idx, item){
          var $target = $contents.eq(idx),
              i = $target.index(),
              targetTop = $target.offset().top;

          if (targetTop <= scltop) { 
            $menu_a.removeClass('tab-act');
            $menu_a.eq(idx).addClass('tab-act'); 
          }
          if (!(0 <= scltop)) { 
            $menu_a.removeClass('tab-act'); 
          } 
        })
      });

  
  // 스크롤 시 다음 화면
  var scrollEvent = false;
  var count = 0;

  $('html,body').on('mousewheel DOMMouseScroll', function (e) {
    e.preventDefault();
    var m = e.originalEvent.wheelDelta;
    var sb = $(window).height();

    if (m >= 1 && scrollEvent == false && count >= 1) {
      console.log(count);
      scrollEvent = true;
      count--;
      $("html, body").stop().animate({scrollTop :sb*count},
        {duration:800, complete: function () {
          scrollEvent = false;
        }}
      );
    }
    else if(m < 1 && scrollEvent ==false && count < 4) {
      console.log(count);
      scrollEvent = true;
      count++;
      $("html, body").stop().animate({scrollTop :sb*count},
        {duration:700, complete: function () {
          scrollEvent = false;
        }}
      );
    }
  })


  
})(this, this.jQuery);