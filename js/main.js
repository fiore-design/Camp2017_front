(function(){
	var submitBtn = document.querySelector('#submit');
		input = document.querySelector('input');
		errorMessage = document.querySelector('.error-message-wrapper');
		urlApi = "https://efigence-camp.herokuapp.com/api/";
	
	submitBtn.addEventListener("click", function(e){ 
		e.preventDefault();

		if (input.value.length) {
			$.ajax({
				type: "post",
					data: {
					login: "efi",
					password: input.value
				},
				url: "https://efigence-camp.herokuapp.com/api/login",
				error: function(response) {
					var res = JSON.parse(response.responseText);
					input.classList.add("error-input-pass");
					errorMessage.classList.remove("hide");
					errorMessage.querySelector('.error-message').textContent = res.message;
				},
				success: function(response) {
					input.classList.remove("error-input-pass");
					window.location = "dashboard.html";
				}
			});
		} else {
			input.classList.add("error-input-pass");
			errorMessage.classList.remove("hide");
			errorMessage.querySelector('.error-message').textContent = 'Write your password';

		}

	});

	// var query = function(type, data, )
})();

