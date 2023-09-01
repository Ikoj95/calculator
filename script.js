const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator')
const clear = document.getElementById('clear');
const resultOperator = document.getElementById('resultOperator');

const arrayOperators = ['x', '/', '+', '-'];

let textToShow = [''];
let textSplit = '';
let counter = 0;

operators.forEach(e => e.disabled = true);
resultOperator.disabled = true;

buttons.forEach(e => e.addEventListener('click', updateScreen));

function checkIfOperatorExists(thisChar) {
    if (arrayOperators.includes(thisChar)) {
        return thisChar;
    }
}

function updateScreen() {

    if (this.textContent !== '=') {
        operators.forEach(e => e.disabled = false)
        if (!this.textContent.includes(checkIfOperatorExists(this.textContent))) {
            screen.textContent = screen.textContent + this.textContent;
            if (textToShow.length === 2) {
                operators.forEach(e => e.disabled = true);
                resultOperator.disabled = false;
            }
        }
        //combine left side of operator and ability to change operator itself
        if (this.textContent.includes(checkIfOperatorExists(this.textContent))) {
            this.disabled = true;
            screen.textContent = screen.textContent + this.textContent;
            textSplit = screen.textContent.split('');
            if (counter === 0) {
                for (let i = 0; i < textSplit.length - 1; i++) {
                    textToShow[0] = textToShow[0] + textSplit[i];
                }
                textToShow[1] = this.textContent;
                counter = 1;
            }
            textToShow[1] = this.textContent;
            screen.textContent = textToShow.join('');
        }
    }
    else {
        const arrayOfStrings = screen.textContent.split(textToShow[1]);
        const arrayOfFloats = arrayOfStrings.map(str => parseFloat(str))
        const result = arrayOfFloats.reduce((a, b) => {
            if (textToShow[1] === 'x') {
                return (a * b).toFixed(2);
            }
            else if (textToShow[1] === '/') {
                return (a / b).toFixed(2);
            }
            else if (textToShow[1] === '+') {
                return a + b.toFixed(2);
            }
            else {
                return a - b.toFixed(2);
            }
        });
        screen.textContent = result;
        operators.forEach(e => e.disabled = false);
        textToShow[0] = result;
        resultOperator.disabled = true;
    }
}

clear.addEventListener('click', () => {
    screen.textContent = '';
    textToShow = [''];
    textSplit = '';
    counter = 0;
});
