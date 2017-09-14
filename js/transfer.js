$(function(){

	function Validator(form){
		this.form = form;
		this.fields = this.form.querySelectorAll("[required]");
		this.errors = [];
		this.errorsList = document.querySelector("#errors-info"); console.log(this.errorsList);

		if(!this.fields.length) return;

		// ------- validaton onblur --------------
		for(var i=0; i < this.fields.length; i++) { 
			this.fields[i].onblur = function(e){
				this.errorsList.innerHTML = "";
				this.validateField(e.target);

				if(!this.errors.length) {
					return true;
				} else{
					this.showErrors();
					return false;
				}
			}.bind(this);
		}

		this.form.onsubmit = function(e) {
			e.preventDefault();
			
			var formValid = this.validate();

			if(formValid) {
				this.form.submit();
			} else{
				return false;
			}
		}.bind(this);
	}

	Validator.prototype.validate = function() {
		this.clearErrors(); 

		for(var i=0; i < this.fields.length; i++) { 
			this.validateField(this.fields[i]);
		}

		if(!this.errors.length) {
			return true;
		} else{
			this.showErrors();
			return false;
		}
	}

	Validator.prototype.validateField = function(field) {
		var fieldValid = field.validity.valid;
		
		if (fieldValid) {
			this.markAsValid(field);
		} else {
			this.errors.push(field.dataset.errorMessage);
			this.markAsInvalid(field);
		}
	}

	Validator.prototype.markAsValid = function(field) {
		field.classList.remove("invalid");
		field.classList.add("valid");
	}

	Validator.prototype.markAsInvalid = function(field) {
		field.classList.remove("valid");
		field.classList.add("invalid");
	}

	Validator.prototype.showErrors = function() {
		var errorListFragment = document.createDocumentFragment();

		for(var i=0; i < this.errors.length; i++) {
			var liEl = document.createElement("li"); 

				liEl.textContent = this.errors[i];
				errorListFragment.appendChild(liEl); 
		}

		this.errorsList.appendChild(errorListFragment);
	}

	Validator.prototype.clearErrors = function() {
		this.errors.length = 0;
		this.errorsList.innerHTML = "";
	}	

	$('#when').fdatepicker({
		initialDate: new Date,
		format: 'dd/mm/yyyy',
		startDate: new Date,
		disableDblClickSelection: true,
		leftArrow:'<<',
		rightArrow:'>>',
		closeIcon:'X',
		closeButton: true
	});

	var validator1 = new Validator(document.querySelector("#form"));
});

