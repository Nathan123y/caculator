const display = document.getElementById('display');
let currentOperation = null;
let currentInput = "";
let previousInput = "";

const updateDisplay = () => {
    display.textContent = currentInput || "0";
};

document.querySelectorAll('.number').forEach(num => {
    num.addEventListener('click', (e) => {
        currentInput += e.target.getAttribute('data-num');
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(op => {
    op.addEventListener('click', (e) => {
        if (currentInput) {
            previousInput = currentInput;
            currentInput = "";
        }
        currentOperation = e.target.getAttribute('data-op');
        if (currentOperation === "=") {
            calculate();
        }
        updateDisplay();
    });
});

document.getElementById('clear').addEventListener('click', () => {
    currentInput = "";
    previousInput = "";
    currentOperation = null;
    updateDisplay();
});

document.querySelector('.button.number.zero').addEventListener('click', () => {
    if (currentInput !== "0" || currentInput.includes(".")) {
        currentInput += "0";
        updateDisplay();
    }
});

document.querySelector('.button.number[data-num="."]').addEventListener('click', () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
});

const calculate = () => {
    if (previousInput && currentInput && currentOperation) {
        currentInput = eval(previousInput + currentOperation + currentInput);
        previousInput = "";
        currentOperation = null;
    }
};

updateDisplay();
