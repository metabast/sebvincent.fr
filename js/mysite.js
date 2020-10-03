(function() {
  window.firstSubmit = false;

  (function($) {
    return $(function() {
      console.log("DOM is ready");
      $('.ui.video').video();
      $('.progress').progress();
      $('.ui.form').form({
        n: {
          identifier: 'n',
          rules: [
            {
              type: 'empty',
              prompt: 'Manquant'
            }
          ]
        },
        f: {
          identifier: 'f',
          rules: [
            {
              type: 'email',
              prompt: 'Manquant'
            }
          ]
        },
        m: {
          identifier: 'm',
          rules: [
            {
              type: 'empty',
              prompt: 'Manquant'
            }
          ]
        }
      }, {
        inline: true,
        onSuccess: function(event) {
          console.log(window.firstSubmit);
          if (window.firstSubmit === false) {
            window.firstSubmit = true;
            return Recaptcha.create('6Ldk_wMTAAAAABau5fOh49sbzuDO9BYzl1RICQak', 'captcha', {
              theme: 'clean',
              callback: Recaptcha.focus_response_field
            });
          } else {
            $('.form').addClass('loading');
            return $.ajax({
              url: '//tools.sebvincent.fr/recaptcha/',
              type: 'POST',
              async: false,
              data: {
                recaptcha_challenge_field: Recaptcha.get_challenge(),
                recaptcha_response_field: Recaptcha.get_response(),
                n: $('.ui.form').form('get value', 'n'),
                f: $('.ui.form').form('get value', 'f'),
                m: $('.ui.form').form('get value', 'm')
              },
              success: function(resp) {
                resp = JSON.parse(resp);
                $('.form').removeClass('loading');
                if (resp.captcha && resp.mailsent) {
                  $('.form').addClass('hide');
                  $('#mailsuccess').removeClass('hide');
                  $('#errorCaptcha').addClass('hide');
                  $('#errorCaptcha .close').off('click');
                  return $('#mailsuccess .close').on('click', function(event) {
                    $(this).off('click');
                    $('#mailsuccess').addClass('hide');
                    $('.form').removeClass('hide');
                    $('.form').form('reset');
                    return Recaptcha.reload();
                  });
                } else {
                  Recaptcha.reload();
                  $('#errorCaptcha').removeClass('hide');
                  return $('#errorCaptcha .close').on('click', function(event) {
                    $(this).off('click');
                    return $('#errorCaptcha').addClass('hide');
                  });
                }
              }
            });
          }
        }
      });
      $('.ui.form').submit(function(event) {
        return false;
      });
      if (!Modernizr.mq('only all and (max-width: 768px)')) {
        $('#headerSegment').height($(window).height() * .25);
        $(window).on('resize', function() {
          return $('#headerSegment').height($(window).height() * .25);
        });
        particlesJS('headerSegment', {
          particles: {
            color: '#fff',
            color_random: false,
            shape: 'circle',
            opacity: {
              opacity: 1,
              anim: {
                enable: false,
                speed: 1.5,
                opacity_min: 0,
                sync: false
              }
            },
            size: 1,
            size_random: true,
            nb: 100,
            line_linked: {
              enable_auto: true,
              distance: 100,
              color: '#fff',
              opacity: 1,
              width: 1,
              condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
              }
            },
            anim: {
              enable: true,
              speed: 1
            }
          },
          interactivity: {
            enable: true,
            mouse: {
              distance: 250
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
              opacity: .5
            },
            events: {
              onclick: {
                enable: true,
                mode: 'push',
                nb: 4
              },
              onresize: {
                enable: true,
                mode: 'out',
                density_auto: false,
                density_area: 800
              }
            }
          },
          retina_detect: true
        });
        return $('#headerSegment canvas').prependTo($('#headerSegment'));
      }
    });
  })(jQuery);

}).call(this);

//# sourceMappingURL=mysite.js.map
