const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('.screen');

buttons.forEach(e => e.addEventListener('click', updateScreen))

function updateScreen() {
    if(this.textContent !== '='){
        screen.textContent = screen.textContent + this.textContent
    }
    else{
        const arrayOfStrings = screen.textContent.split('x');
        const arrayOfFloats = arrayOfStrings.map(str => parseFloat(str))
        const result = arrayOfFloats.reduce((a,b) => a*b);
        screen.textContent = result;
    }
    //let indexx = screen.textContent.indexOf('x');
    
    //console.log(indexx);
}