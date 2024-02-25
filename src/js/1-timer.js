'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const dateNow = new Date();

    if (userSelectedDate > dateNow) {
      startBtn.disabled = false;
      if (!intervalId) {
        startBtn.addEventListener('click', startTimer);
      }
    } else {
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        backgroundColor: '#EF4040',
        messageColor: '#ffffff',
        position: 'topRight',
        iconUrl: '../img/bi_x-octagon.png',
      });
      startBtn.disabled = true;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  },
};

flatpickr('input#datetime-picker', options);

function startTimer() {
  startBtn.disabled = true;
  input.disabled = true;
  intervalId = setInterval(() => {
    const dateNow = new Date().getTime();
    const delta = userSelectedDate - dateNow;

    if (delta <= 0) {
      clearInterval(intervalId);
      //   iziToast.success({
      //     title: 'Success',
      //     message: 'Countdown finished!',
      //   });
      startBtn.disabled = false;
      input.disabled = false;
    } else {
      updateTimerUI(convertMs(delta));
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days); //`${days}`
  timerHours.textContent = addLeadingZero(hours); //`${hours}`
  timerMinutes.textContent = addLeadingZero(minutes); //`${minutes}`
  timerSeconds.textContent = addLeadingZero(seconds); //`${seconds}`
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
