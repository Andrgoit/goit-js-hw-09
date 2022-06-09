import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('submit', submitBtnHandler);

function submitBtnHandler(event) {
  event.preventDefault();
  // console.log('handler');

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  // console.log(delay.value, step.value, amount.value);

  let result = Number(delay.value);

  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i, result)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    result += Number(step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill

        resolve({ position, delay });
      } else {
        // Reject

        reject({ position, delay });
      }
    }, delay);
  });
}
