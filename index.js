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
  event.target.disabled = true;

  if (isWinningMove(event.target)) {
    setTimeout(() => {
      if (player === 'cross') {
        confirm('Vyhrává hráč s kolečkem. Spustit novou hru?');
        location.reload();
      } else {
        confirm('Vyhrává hráč s křížkem. Spustit novou hru?');
        location.reload();
      }
    }, 200);
  }
};

const btnsElm = document.querySelectorAll('.single-game-button');
for (let i = 0; i < btnsElm.length; i++) {
  btnsElm[i].addEventListener('click', addSymbol);
}

// Detekce výherního tahu

const getSymbol = (btnsElm) => {
  if (btnsElm.classList.contains('board__field--circle')) {
    return 'circle';
  } else if (btnsElm.classList.contains('board__field--cross')) {
    return 'cross';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.single-game-button');

const getField = (row, column) => btnsElm[row * boardSize + column];

const getPosition = (btnsElm) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && btnsElm !== fields[fieldIndex]) {
    fieldIndex += 1;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const isWinningMove = (btnsElm) => {
  const origin = getPosition(btnsElm);
  const symbol = getSymbol(btnsElm);

  // Řada
  let i;
  //vlevo
  let inRow = 1;
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow += 1;
    i -= 1;
  }

  //vpravo
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow += 1;
    i += 1;
  }

  if (inRow >= 5) {
    console.log('vyhrál');
    return true;
  }

  // Sloupec
  let inColumn = 1;

  //nahoře
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn += 1;
    i -= 1;
  }

  //dole
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn += 1;
    i += 1;
  }

  if (inColumn >= 5) {
    console.log('vyhrál');
    return true;
  }
  console.log('nic');
  return false;
};
