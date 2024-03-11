const currenciesContainer = document.getElementById('currencies');

const result = fetch('https://rich-erin-angler-hem.cyclic.app/students/available');

result
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency.code;
            option.textContent = `${currency.code} (${currency.symbol})`;
            currenciesContainer.appendChild(option);
        });
    })
    .catch(error => {
        console.log('Error fetching the api:', error.message);
});


/*const result = axios.get("https://rich-erin-angler-hem.cyclic.app/students/available");

result.then((response) => {
   console.log(response.data);
});*/