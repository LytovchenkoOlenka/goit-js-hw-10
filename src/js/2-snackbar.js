'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import success from '../img/bi_check2-circle.png';
import cross from '../img/bi_x-octagon.png';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayValue = document.querySelector('[name="delay"]').value;
  const stateValue = document.querySelector(
    'input[name="state"]:checked'
  ).value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        res(`Fulfilled promise in ${delayValue}ms`);
      } else {
        rej(`Rejected promise in ${delayValue}ms`);
      }
    }, delayValue);
  });

  promise
    .then(result => {
      iziToast.success({
        title: '',
        message: result,
        backgroundColor: '#59A10D',
        messageColor: '#ffffff',
        position: 'topRight',
        iconUrl: success,
      });
    })
    .catch(error => {
      iziToast.error({
        title: '',
        message: error,
        backgroundColor: '#EF4040',
        messageColor: '#ffffff',
        position: 'topRight',
        iconUrl: cross,
      });
    });
  form.reset();
});
