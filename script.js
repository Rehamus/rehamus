
/*로그인상태 유지 시작 */
function login_test() {


  if (sessionStorage.getItem("login_o") == null) {
    sessionStorage.setItem("login_o", 0);
    
  }else if (sessionStorage.getItem("login_o") != 0) {
    $('.ID_log').hide();
  }
}

login_test();

/*로그인상태 끝 */

$('.log_find > *').click(function () {
  $('.id_new').addClass('show');
});
/*회원가입 설정*/
$('.id_new_C').click(function () {
  $('.id_new').removeClass('show');
  $('#F_new_Id_menu').removeClass('show');
  $('#F_fw_menu').removeClass('show');
  $('.id_menu').removeClass('show')

});
$('#F_new_Id').click(function () {
  $('#login_new').removeClass('hidden')
  $('#login_f_pw').addClass('hidden')
  $('#login_new_L').removeClass('hidden')
  $('#login_f_pw_L').addClass('hidden')
  $('.id_menu').addClass('show')
});

$('#F_fw').click(function () {
  $('#login_f_pw').removeClass('hidden')
  $('#login_f_pw_L').removeClass('hidden')
  $('#login_new').addClass('hidden')
  $('#login_new_L').addClass('hidden')
  $('.id_menu').addClass('show')
});
/*가입 설정 추가*/


/*로그아웃 구현 */
$('#logout').click(function () {
  sessionStorage.setItem("login_o", 0);
  $('.id_Design').removeClass('login');
  $('.id_menu').removeClass('login');
  window.location.reload()
});
/*로그아웃 끝 */

// 접었다 폈다
$('#contents_view > li').children('button').click(function () {
  let onoff = $(this).nextAll().children('div');

  if( onoff.hasClass( "hidden")){
    onoff.removeClass('hidden')
  }else{
    onoff.addClass('hidden')
  }

})

// 매뉴 따라오게 만들기
$(document).ready(function() {
  var $floatingElement = $('#box2');
  var floatingStart = 450; // 요소가 이동을 시작할 스크롤 위치를 설정합니다.

  $(window).scroll(function() {
      var scrollPosition = $(this).scrollTop();

      // 만약 스크롤 위치가 시작 위치보다 크거나 같다면,
      if (scrollPosition >= floatingStart) {
          // 요소의 위치를 조정하여 스크롤과 함께 이동하도록 합니다.
          $floatingElement.css({
              'position': 'fixed',
              'top': '0'
          });
      } else {
          // 아니면 원래 위치로 되돌립니다.
          $floatingElement.css({
              'position': 'absolute',
              'top': '448px' // 시작 위치
          });
      }
  });
});
