const rows = 10;
const cols = 10;

// 보드 초기화
function InitBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <  cols; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}${j}`;
      cell.dataset.isbomb = Math.random() < 0.1;
      cell.onclick = function() {handle(i, j); };
      board.appendChild(cell);
    }
  }
}

// 셀 클릭
function handle(row, col) {
  const cell = document.getElementById(`cell-${row}${col}`);
  const isbomb = cell.dataset.isbomb == "true";
  
  cell.textContent = `${cell.dataset.isbomb}!`;
  cell.style.color = "red";
  if (isbomb) {
    cell.style.color = "blue";
  }
}

// 인접 셀 조사
function Neighbor(row, col) {
  const cell = document.getElementById(`cell-${row}${col}`);
  const neighbor = [];
  
  if (row > 0) {
    neighbor.push(document.getElementById(`cell-${row - 1}${col}`));
  }
  if (row < rows - 1) {
    neighbor.push(document.getElementById(`cell-${row + 1}${col}`));
  }
  if (col > 0) {
    neighbor.push(document.getElementById(`cell-${row}${col - 1}`));
  }
  if (col < cols - 1) {
    neighbor.push(document.getElementById(`cell-${row}${col + 1}`));
  }
  if (row > 0 && col > 0) {
    neighbor.push(document.getElementById(`cell-${row - 1}${col - 1}`));
  }
  if (row < rows - 1 && col > 0) {
    neighbor.push(document.getElementById(`cell-${row + 1}${col - 1}`));
  }
  if (row > 0 && col < cols - 1) {
    neighbor.push(document.getElementById(`cell-${row - 1}${col + 1}`));
  }
  if (row < rows - 1 && col < cols - 1) {
    neighbor.push(document.getElementById(`cell-${row + 1}${col + 1}`));
  }
  
  for (let i = 0 i < neighbor.length; i++) {
    
  }
}

InitBoard();

