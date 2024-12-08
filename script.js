let isPlay = false;
let rows = 10; // 행
let cols = 10; // 열
let checked_nums = 0; // 확인한 셀 수
let totalBombs = 0; // 폭탄 수
let pro = 0.1; // 폭탄 확률

// 보드 초기화
function InitBoard(level) {
  ClearBoard();
  checked_nums = 0;
  totalBombs = 0;
  pro = 0.1;
  
  if (level === "easy") {
    rows = 10;
    cols = 10;
    pro = 0.1;
  }
  else if (level === "medium") {
    rows = 20;
    cols = 20;
    pro = 0.1;
  }
  else if (level === "hard") {
    rows = 25;
    cols = 25;
    pro = 0.2;
  }
  isPlay = true;
  
  const board = document.getElementById("board");
  board.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
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
  if (!isPlay) return;
  
  const cell = document.getElementById(`cell-${row}${col}`);
  const isbomb = cell.dataset.isbomb === "true";
  Neighbor(row, col);
  
  //폭탄 클릭할 경우
  if (isbomb) {
    cell.style.color = "blue";
    isPlay = false;
    GameOver();
    return;
  }
  
  if (rows * cols - checked_nums == totalBombs) {
    isPlay = false;
    GameClear();
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
  checked_nums++;
  
  cell.textContent = `${bomb_nums}`;
  cell.style.color = "black";
  cell.style.backgroundColor = "#fff";
  
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

function ClearBoard() {
  const board = document.getElementById("board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function GameOver() {
  alert("Game Over");
}
function GameClear() {
  alert("Game Clear");
}

InitBoard();
