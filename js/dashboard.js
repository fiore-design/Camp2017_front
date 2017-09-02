(function() {
	const getSummary = function(endpoint, containers) {

		var balanceContainer = document.querySelector( containers.balance );
		fundsContainer = document.querySelector( containers.funds );
		paymentsContainer = document.querySelector( containers.payments );

		$.get("https://efigence-camp.herokuapp.com/api/" + endpoint, (data) => {
			// console.log(data);

			var balanceValue = data.content[0].balance;
			var fundsValue = data.content[0].funds;
			var paymentsValue = data.content[0].payments;
			
			balanceContainer.innerText = balanceValue;
			fundsContainer.innerText = fundsValue;
			paymentsContainer.innerText = paymentsValue;
		});
	}

	var getProducts = function (){

		$.get('https://efigence-camp.herokuapp.com/api//data/products', function(data) {
			// console.log(data);
			var productsContainer = document.querySelector('#products');

			var prodactsList = data.content;
			var content = '';

			prodactsList.forEach( function(element, index){
				console.log(element);
				// ${index}` interpolacja
				// `${elemnt.type}`
				
				content += '<div class="medium-6">';
				content += '<h4>' + element.type + '</h4>';
				content += '<span class="' + element.type + '">' + element.amount + ' ' + element.currency + '</span>';
				content += '</div>';
				// console.log(content);
				
			});

			productsContainer.insertAdjacentHTML('beforeend', content);

		})
	}

	var balanceContainer = document.querySelector("#balance");
		fundsContainer = document.querySelector("#funds");
		paymentsContainer = document.querySelector("#payments");

		var endpoint = "data/summary";
		var containers = {
			balance: "#balance",
			funds: "#funds",
			payments: "#payments"
		}

		getSummary(endpoint, containers);
		getProducts();
})();
