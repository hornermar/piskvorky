'use strict';

let player = 'circle';

const symbolElm = document.querySelector('.symbol');

const addSymbol = (event) => {
  if (player === 'circle') {
    event.target.classList.add('board__field--circle');
    player = 'cross';
    symbolElm.src = 'podklady/cross.svg';
  } else {
    event.target.classList.add('board__field--cross');
    player = 'circle';
    symbolElm.src = 'podklady/circle.svg';
  }
  event.target.removeEventListener('click', addSymbol);
  event.target.disabled = true;
};

const btnsElm = document.querySelectorAll('.single-game-button');
for (let i = 0; i < btnsElm.length; i++) {
  btnsElm[i].addEventListener('click', addSymbol);
}
