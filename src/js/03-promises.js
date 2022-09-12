import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({position, delay});
        }, delay);
      }); 
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject({position, delay});
        })
      }, delay); 
    }
};

formEl.addEventListener('submit', ev => {
  ev.preventDefault();
  const { elements: { delay, step, amount }} = ev.currentTarget;
  
  let delayNum = Number(delay.value);
  console.log(delayNum);
  let stepNum =  Number(step.value);

  for (let i = 0; i < amount.value; i++) {

    createPromise((i + 1), delayNum)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  })  
  delayNum += stepNum;
  }
})
