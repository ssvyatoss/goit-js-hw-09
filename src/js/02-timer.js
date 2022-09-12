import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');

let timerId = null;
let userDates = null;
startBtn.disabled = true;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

  function pad(value) {
    return String(value).padStart(2, 0);
  };

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if(selectedDates[0] <= Date.now()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
      }
      startBtn.disabled = false;
      userDates = selectedDates[0];
    },
  };

flatpickr(input, options);

  startBtn.addEventListener('click', () => {

    timerId = setInterval(() => {
        const diff = userDates - Date.now();
        if(diff <= 0) {
            clearInterval(timerId);

            return;
        }
       const {days, hours, minutes, seconds} = convertMs(diff);
       daysVal.textContent = pad(days);
       hoursVal.textContent = pad(hours);
       minutesVal.textContent = pad(minutes);
       secondsVal.textContent = pad(seconds);
    }, 1000);
  });

    