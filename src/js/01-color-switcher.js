import { refs } from './01-refs';
import { getRandomHexColor } from './01-randomGenerator';
// тренеруюсь с импортом/экспортом

let timerId;

refs.startBtn.addEventListener('click', startBtnHandler);
refs.stopBtn.addEventListener('click', stopBtnHandler);

function startBtnHandler() {
    timerId = setInterval(changeBgColor, 1000)
    refs.startBtn.setAttribute("disabled", "disabled")
    
}

function changeBgColor (){
    const random = getRandomHexColor()
    refs.body.style.backgroundColor = `${random}`;
}

function stopBtnHandler(){
    clearInterval(timerId)
    refs.startBtn.removeAttribute("disabled")
}