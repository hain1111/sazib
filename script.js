const rows = 10;
const cols = 10;

// 보드 초기화
function InitBoard() {
  const board = document.getElementById("board");
  let totalBombs = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <  cols; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}${j}`;
      cell.dataset.isbomb = Math.random() < 0.1;
      if (cell.dataset.isbomb === "true") totalBombs++;
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.dataset.checked = "false";
      cell.onclick = function() {handle(i, j); };
      board.appendChild(cell);
    }
  }
  
  const total = document.getElementById("total");
  total.textContent = `폭탄 수:${totalBombs}`;
  
}

// 셀 클릭
function handle(row, col) {
  const cell = document.getElementById(`cell-${row}${col}`);
  const isbomb = cell.dataset.isbomb === "true";
  Neighbor(row, col);
  
  if (isbomb) {
    cell.style.color = "blue";
  }
}

// 인접 셀 조사
function Neighbor(row, col) {
  const cell = document.getElementById(`cell-${row}${col}`);
  if (cell.dataset.checked === "true") return 0;
  
  const neighbor = [];
  let bomb_nums = 0;
  
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
  
  for (let i = 0; i < neighbor.length; i++) {
    if (neighbor[i].dataset.isbomb === "true") {
      bomb_nums++;
    }
  }
  
  cell.dataset.checked = "true";
  
  cell.textContent = `${bomb_nums}`;
  cell.style.color = "white";
  
  if (bomb_nums == 0) {
    for (let i = 0; i < neighbor.length; i++) {
      const neighborCell = neighbor[i];
      const cellRow = parseInt(neighborCell.dataset.row, 10);
      const cellCol = parseInt(neighborCell.dataset.col, 10);
      Neighbor(cellRow, cellCol);
    }
  }
  
  
  return bomb_nums;
}

InitBoard();

