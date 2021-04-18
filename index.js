'use strict';

let player = 'circle';

const addSymbol = (event) => {
  if (player === 'circle') {
    event.target.classList.add('board__field--circle');
    player = 'cross';
  } else {
    event.target.classList.add('board__field--cross');
    player = 'circle';
  }
  event.target.removeEventListener('click', addSymbol);
};

const btnsElm = document.querySelectorAll('.single-game-button');
for (let i = 0; i < btnsElm.length; i++) {
  btnsElm[i].addEventListener('click', addSymbol);
}
