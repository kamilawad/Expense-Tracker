const currenciesContainer = document.getElementById('currency');
const transactionForm = document.getElementById('transaction-form');
const totalBalance = document.getElementById('totalbalance');
const transactionsList = document.getElementById('transactions');
let transactions = [];

const result = fetch('https://rich-erin-angler-hem.cyclic.app/students/available');

result
    .then(response => response.json())
    .then(data => {
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

const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const total = totalIncome - totalExpense;
    totalBalance.textContent = `${total} USD`;
}

const displayTransactions = () => {
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        if (transaction.type === 'income') {
            li.classList.add('income');
        }
        else {
            li.classList.add('expense');
        }
        li.textContent = `${transaction.amount} ${transaction.transactionCurrency}`;
        transactionsList.appendChild(li);
    });
};

const loadTransactions = () => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
        calculateBalance();
        displayTransactions();
    }
}

const saveTransactions = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions)); 
}

transactionForm.addEventListener("submit", e => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const transactionCurrency = document.getElementById('currency').value;
    transactions.push({amount, type, transactionCurrency});
    saveTransactions();
    loadTransactions();
    /*const userData = {
        from: transactionCurrency,
        to: 'USD',
        amount: amount
    };

    fetch("https://rich-erin-angler-hem.cyclic.app/students/convert", {
        method: "POST",
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        const {amount} = data;
        transactions.push(amount);
        let total = calculateBalance(type,amount)

    })
    .catch(error => {
        console.errlogor('Error:', error.message);
    });*/

});

