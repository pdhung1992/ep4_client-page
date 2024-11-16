// $(function() {
//
// 	// Get the form.
// 	var form = $('#contact-form');
//
// 	// Get the messages div.
// 	var formMessages = $('.ajax-response');
//
// 	// Set up an event listener for the contact form.
// 	$(form).submit(function(e) {
// 		// Stop the browser from submitting the form.
// 		e.preventDefault();
//
// 		// Serialize the form data.
// 		var formData = $(form).serialize();
//
// 		// Submit the form using AJAX.
// 		$.ajax({
// 			type: 'POST',
// 			url: $(form).attr('action'),
// 			data: formData
// 		})
// 		.done(function(response) {
// 			// Make sure that the formMessages div has the 'success' class.
// 			$(formMessages).removeClass('error');
// 			$(formMessages).addClass('success');
//
// 			// Set the message text.
// 			$(formMessages).text(response);
//
// 			// Clear the form.
// 			$('#contact-form input,#contact-form textarea').val('');
// 		})
// 		.fail(function(data) {
// 			// Make sure that the formMessages div has the 'error' class.
// 			$(formMessages).removeClass('success');
// 			$(formMessages).addClass('error');
//
// 			// Set the message text.
// 			if (data.responseText !== '') {
// 				$(formMessages).text(data.responseText);
// 			} else {
// 				$(formMessages).text('Oops! An error occured and your message could not be sent.');
// 			}
// 		});
// 	});
//
// });

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('contact-form');
	const formMessages = document.querySelector('.ajax-response');

	form.addEventListener('submit', function(e) {
		// Ngừng hành động mặc định của form
		e.preventDefault();

		const formData = new FormData(form);

		const xhr = new XMLHttpRequest();
		xhr.open('POST', form.action, true);

		xhr.onload = function() {
			if (xhr.status === 200) {
				formMessages.classList.remove('error');
				formMessages.classList.add('success');

				formMessages.textContent = xhr.responseText;

				form.reset();
			} else {
				formMessages.classList.remove('success');
				formMessages.classList.add('error');

				formMessages.textContent = xhr.responseText || 'Oops! An error occurred and your message could not be sent.';
			}
		};

		xhr.onerror = function() {
			formMessages.classList.remove('success');
			formMessages.classList.add('error');
			formMessages.textContent = 'Oops! An error occurred and your message could not be sent.';
		};

		xhr.send(formData);
	});
});

