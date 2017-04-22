$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

    $('.popup').magnificPopup();

});

//Форма отправки 2.0
$(function() {
    $("[name=send]").click(function () {
        $(":input.error").removeClass('error');
        $(".allert").remove();

        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input, textarea');
        var send_btn = btn.closest('form').find('[name=send]');
        var subject = btn.closest('form').find('[name=form_subject]');
        $(ref).each(function () {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if (!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[0-9]{9,18}/i;
                if ($(this).attr("type") == 'tel') {
                    if (!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        var form = btn.closest('form'), name = form.find('[name=name]').val();
        if (!(error == 1)) {
            $(send_btn).each(function () {
                $(this).attr('disabled', true);
            });

            form.submit();
            // $.ajax({
            //     type: 'POST',
            //     url: '/magnit/mail.php',
            //     data: msg,
            //     success: function (data) {
            //         $.magnificPopup.close();
            //         form[0].reset();
            //         $(send_btn).each(function () {
            //             $(this).attr('disabled', false);
            //         });
            //
            //         location.href='/magnit/thankyou.html';
            //
            //
            //     },
            //     error: function (xhr, str) {
            //         alert('Возникла ошибка: ' + xhr.responseCode);
            //     }
            // });
        }else{
            form.parents(".form-block").addClass("shake");
            form.parents(".form-block").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
               $(this).removeClass("shake");
            });
        }
        return false;
    });


    $("input[required]").blur(function(){
        if ($(this).val() == '') {
            var errorfield = $(this);
            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
            error = 1;
            return;
        } else {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if ($(this).attr("type") == 'email') {
                if (!pattern.test($(this).val())) {
                    $("[name=email]").val('');
                    $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                    error = 1;
                }
            }
            var patterntel = /^()[0-9]{9,18}/i;
            if ($(this).attr("type") == 'tel') {
                if (!patterntel.test($(this).val())) {
                    $("[name=phone]").val('');
                    $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                    error = 1;
                }
            }
        }
    });

});