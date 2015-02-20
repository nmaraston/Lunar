(function( $ ) {
	$.fn.emaillightbox = function( options ) {

		var inst = this;

		var settings = $.extend({
			apiKey: "-1"
		}, options);

		inst.init = function() {
			inst.$lightbox = jQuery('#email-lightbox');
			inst.$lightbox.css({ position: "fixed" });

			inst.$close = $("#email-lightbox-close", inst.$lightbox);
			inst.$close.click(inst.finish);
			$("#email-lightbox-overlay", inst.$lightbox).click(inst.finish);

			inst.$emailNameTextField = $("#name", inst.$lightbox);
			inst.$emailAddressTextField = $("#email", inst.$lightbox);
			inst.$emailMessageTextField = $("#message", inst.$lightbox);

			inst.$successMsg = $("#success", inst.$lightbox);
			inst.$errorMsg = $("#errors", inst.$lightbox);

			inst.$submit = $("#submit-button", inst.$lightbox);
			inst.$submit.click(inst.sendEmail);
		};

		inst.finish = function() {
			inst.$lightbox.slideUp(200);
			inst.$errorMsg.hide();
			inst.$successMsg.hide();
		};

		inst.sendEmail = function() {
			var formValidationResult = inst.validateEmailForm();
			if (formValidationResult) {
				inst.$errorMsg.hide();
				inst.mandrillEmailSend();
				inst.$successMsg.show();
			} else {
				inst.$errorMsg.show();
			}
		};

		inst.validateEmailForm = function() {
			return ($.trim(inst.$emailNameTextField.val()).length && $.trim(inst.$emailAddressTextField.val()).length && $.trim(inst.$emailMessageTextField.val()).length);
		};

		inst.mandrillEmailSend = function() {
			$.ajax({
				type: "POST",
				url: "https://mandrillapp.com/api/1.0/messages/send.json",
				data: {
					'key': 'cFKKmi6IdHxYLKo7Krlsew',
					'message': {
						'from_email': inst.$emailAddressTextField.val(),
						'to': [{
							'email': "nick.maraston@gmail.com",
							'name': "nick",
							'type': 'to'
						}],
						'autotext': 'true',
						'subject': inst.$emailNameTextField.val() + " via cosmotionpictures.com",
						'html': inst.$emailMessageTextField.val()
					}
				}
			});
		};

		inst.clickHandler = function() {
			inst.$lightbox.slideDown(200);
			return false;
		};

		inst.init();
		return inst.unbind("click").click(inst.clickHandler);
	};

}(jQuery));

jQuery(document).ready(function() {
	jQuery(".emaillightbox").emaillightbox();
});