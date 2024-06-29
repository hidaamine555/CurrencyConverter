
const apiKey = '71898b18ab35b092f62dc137'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                fromCurrencySelect.innerHTML += `<option value="${currency}">${currency}</option>`;
                toCurrencySelect.innerHTML += `<option value="${currency}">${currency}</option>`;
            });
        })
        .catch(error => console.error('Error fetching the exchange rates:', error));

    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
            .then(response => response.json())
            .then(data => {
                const result = data.conversion_result;
                resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
            })
            .catch(error => console.error('Error converting the currency:', error));
    });
});
