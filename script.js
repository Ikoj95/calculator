const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator')
const clear = document.getElementById('clear');
const resultOperator = document.getElementById('resultOperator');
const point = document.getElementById('point');
const numbers = document.querySelectorAll('.number');

const arrayOperators = ['x', '/', '+', '-'];

let textToShow = [''];
let textSplit = '';
let counter = 0;
let counter2 = 0;
let counter3 = 1;
let counter4 = 0;

operators.forEach(e => e.disabled = true);
resultOperator.disabled = true;

window.addEventListener('keydown',keyo);
buttons.forEach(e => e.addEventListener('click', updateScreen));





function keyo(e) {
    const keys = document.querySelector(`button[data-key=${e.code}]`);
    if (!keys) return;
    console.log(keys.textContent);
    if (keys.textContent !== '=') {

        if (keys.textContent !== checkIfOperatorExists(keys.textContent)) {
            screen.textContent = screen.textContent + keys.textContent;
            if (keys.textContent === '.') {
                point.disabled = true;
            }
            if (textToShow.length === 2) {
                operators.forEach(e => e.disabled = true);
                resultOperator.disabled = false;
                counter2 = 0;
                counter4 = 1;
            }
            if (counter4 === 0) {
                counter2 = 1;
            }

            if (counter2 === 1 && counter3 !== 0) {
                operators.forEach(e => e.disabled = false);
                counter3 = 0;
            }
        }
        //combine left side of operator(only doing it once) and ability to change operator itself
        else if (keys.textContent === checkIfOperatorExists(keys.textContent) && counter2 === 1) {
            operators.forEach(p => p.disabled = false);
            operators.forEach(p => { if (p.textContent === keys.textContent) { p.disabled = true; } })
            point.disabled = false;
            numbers.forEach(e => e.disabled = false);
            screen.textContent = screen.textContent + keys.textContent;
            if (counter === 0) {
                textSplit = screen.textContent.split('');
                for (let i = 0; i < textSplit.length - 1; i++) {
                    textToShow[0] = textToShow[0] + textSplit[i];
                }
                textToShow[1] = keys.textContent;
                counter = 1;
            }
            textToShow[1] = keys.textContent;
            screen.textContent = textToShow.join('');
        }
    }
    else {
        const arrayOfStrings = screen.textContent.split(textToShow[1]);
        const arrayOfFloats = arrayOfStrings.map(str => parseFloat(str))
        const result = arrayOfFloats.reduce((a, b) => {
            switch (textToShow[1]) {
                case 'x':
                    return (a * b).toFixed(2);
                case '/':
                    return (a / b).toFixed(2);
                case '+':
                    return (a + b).toFixed(2);
                case '-':
                    return (a - b).toFixed(2);
            }
        });
        screen.textContent = result;
        operators.forEach(e => e.disabled = false);
        textToShow[0] = result;
        resultOperator.disabled = true;
        numbers.forEach(e => e.disabled = true);
        point.disabled = true;
        counter2 = 1;
    }
}


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
            if (this.textContent === '.') {
                point.disabled = true;
            }
            if (textToShow.length === 2) {
                operators.forEach(e => e.disabled = true);
                resultOperator.disabled = false;
                counter2 = 0;
                counter4 = 1;
            }
            if (counter4 === 0) {
                counter2 = 1;
            }

            if (counter2 === 1 && counter3 !== 0) {
                operators.forEach(e => e.disabled = false);
                counter3 = 0;
            }
        }
        //combine left side of operator(only doing it once) and ability to change operator itself
        else if (this.textContent.includes(checkIfOperatorExists(this.textContent)) && counter2 === 1) {
            this.disabled = true;
            point.disabled = false;
            numbers.forEach(e => e.disabled = false);
            screen.textContent = screen.textContent + this.textContent;
            if (counter === 0) {
                textSplit = screen.textContent.split('');
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
            switch (textToShow[1]) {
                case 'x':
                    return (a * b).toFixed(2);
                case '/':
                    return (a / b).toFixed(2);
                case '+':
                    return (a + b).toFixed(2);
                case '-':
                    return (a - b).toFixed(2);
            }
        });
        screen.textContent = result;
        operators.forEach(e => e.disabled = false);
        textToShow[0] = result;
        resultOperator.disabled = true;
        numbers.forEach(e => e.disabled = true);
        point.disabled = true;
        counter2 = 1;
    }
}

clear.addEventListener('click', () => {
    screen.textContent = '';
    textToShow = [''];
    textSplit = '';
    counter = 0;
    point.disabled = false;
    operators.forEach(e => e.disabled = true);
    resultOperator.disabled = true;
    numbers.forEach(e => e.disabled = false);
});
