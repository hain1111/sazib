const rows = 10;
const cols = 10;

function InitBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <  cols; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}${j}`;
      cell.onclick = function() {handle(i, j); };
      board.appendChild(cell);
    }
  }
}

function handle(row, col) {
  const cell = document.getElementById(`cell-${row}${col}`);
  alert(`${cell.id}!`);
  
  cell.textContent = "1";
  cell.style.color = "red";
}

InitBoard();
