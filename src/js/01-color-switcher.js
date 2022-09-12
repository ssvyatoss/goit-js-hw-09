function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const color = document.querySelector('body');
  const btnStart = document.querySelector('button[data-start]');
  const btnStop = document.querySelector('button[data-stop]');

  let timerId = null;

  btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    timerId = setInterval(() => {
        color.style.background = getRandomHexColor();
    }, 1000);
  });

  btnStop.addEventListener('click', () => {
    btnStart.disabled = false; 
    clearInterval(timerId);
  });





