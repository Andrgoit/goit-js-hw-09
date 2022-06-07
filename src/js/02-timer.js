// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей НЕ РАБОТАЕТ
// import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('div.timer'),
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}


const CURRENT_DATE = new Date;
// console.log(CURRENT_DATE);
let timerId = null;
let getTime = null;


//отключение кнопки при загрузке страницы
refs.startBtn.setAttribute('disabled', true);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      // console.log(selectedDates[0]);
      const getSelectDates = selectedDates[0].getTime();
      const getCurrentDate = CURRENT_DATE.getTime();
      
      if (getSelectDates >getCurrentDate || timerId === null){
        refs.startBtn.removeAttribute('disabled');
        refs.startBtn.addEventListener('click', timer)
        getTime = getSelectDates;
      } else {
        refs.startBtn.setAttribute('disabled', true);
        Notify.failure('Please choose a date in the future')
      }
    },
  };


// console.log(getTime);
//инициализация flatpickr
  flatpickr(refs.input, options);

  


function timer (){
const selectDate = getTime;

  let timeId = setInterval(() =>{
    const timeNow = new Date;
    const time = selectDate - timeNow;
    if (time >0){
      convertMs(time);
      refs.startBtn.setAttribute('disabled', true);
    } else {
      clearInterval(timeId)
    }
  },1000)
};


//функция подсчета времени
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    refs.day.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  };

//функция создания двузначного значения времени
function addLeadingZero(value){
    return String(value).padStart(2,"0")
 };
