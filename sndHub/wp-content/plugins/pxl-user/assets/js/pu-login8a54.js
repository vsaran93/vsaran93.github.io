(function ($) {
	$(".pu-login-form").each(function () {
		$(this).find(".ajax-login").on("click", function (e) {
			e.preventDefault();
			var $this = $(this);
			var username = $this.closest("form").find('input[name="username"]').val();
			var password = $this.closest("form").find('input[name="password"]').val();
			var rememberme = $this.closest("form").find('input[name="rememberme"]').val(),
				redirect_url = $this.closest("form").find('input[name="redirect"]').val();
			if ("hcaptcha" === pu_login_params.recaptcha_type) {
				var CaptchaResponse = $this.closest("form").find('[name="h-captcha-response"]').val();
			} else {
				var CaptchaResponse = $this.closest("form").find('[name="g-recaptcha-response"]').val();
			}

			var url = pu_login_params.ajax_url + "?action=pu_ajax_login_submit&security=" + pu_login_params.pu_login_form_save_nonce;

			$this.addClass("loading");

			$.ajax({
				type: "POST",
				url: url,
				data: {
					username: username,
					password: password,
					rememberme: rememberme,
					CaptchaResponse: CaptchaResponse,
					redirect: redirect_url,
				},
				success: function (res) {
					$this.removeClass("loading");
					if (res.success == false) {
						$(document).trigger(
							"pu_after_login_failed",
							[$this]
						);

						$this.closest(".pxl-login-form").find(".pu-error").remove();

						$this.closest(".pxl-login-form").prepend('<ul class="pu-error">' + res.data.message + "</ul>");
					} else {
						window.location.href = res.data.message;
					}
				},
			});
		});
	});
})(jQuery);