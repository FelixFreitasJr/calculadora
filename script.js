function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
    const history = document.getElementById('history');
    history.value = '';
    const historyLabel = document.getElementById('history-label');
    historyLabel.style.display = 'none';
}

function calculate() {
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    const historyLabel = document.getElementById('history-label');
    try {
        const result = eval(display.value);
        history.value = `${display.value} = ${result}`;
        addToHistory(display.value, result);
        display.value = result;
        historyLabel.style.display = 'block';
    } catch (e) {
        display.value = 'Erro';
    }
}

function addToHistory(equation, result) {
    const historyArray = JSON.parse(localStorage.getItem('history')) || [];
    historyArray.push(`${equation} = ${result}`);
    localStorage.setItem('history', JSON.stringify(historyArray));
    displayHistory();
}

function displayHistory() {
    const historyArray = JSON.parse(localStorage.getItem('history')) || [];
    const historyElement = document.getElementById('history');
    const historyLabel = document.getElementById('history-label');
    console.log("Histórico de Operações:");
    historyArray.forEach(item => {
        console.log(item);
    });
    if (historyArray.length > 0) {
        historyElement.value = historyArray[historyArray.length - 1];
        historyLabel.style.display = 'block';
    } else {
        historyElement.value = '';
        historyLabel.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', displayHistory);

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === ',' || key === '/' || key === '*' || key === '-' || key === '+') {
        appendToDisplay(key);
    } else if ( key === 'Enter'){
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace'){
        clearDisplay();
    }
});