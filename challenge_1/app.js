// there is a lot of bugs in the code, but this what i could do in just one day, maybe i will fix it some day :)

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var player1 = 'X';
var player2 = 'O';

var winStuation = [
  [0, 1, 2], // index 0
  [3, 4, 5], // index 1
  [6, 7, 8], // index 2
  [0, 3, 6], // index 3
  [1, 4, 7], // index 4
  [2, 5, 8], // index 5
  [0, 4, 8], // index 6
  [2, 4, 6]  // index 7
];

// making an array that containes all the cells
var cells = document.querySelectorAll('.cell');

// when the new game start
var play = () => {
  // looping in each cell
  for (var i = 0; i < cells.length; i++) {
    // return the board to inital values
    board[i] = i;
    // empty each cell from the text
    cells[i].innerText = '';
    // change the background color into the defult
    cells[i].style.backgroundColor = 'white';
    // clear the winner name
    document.querySelector('.winner').innerText = "Winner: "
    // add event listener for each cell
    cells[i].addEventListener('click', clicked, false);
  }
}

// when click on the cell
var clicked = (cell) => {
  // check if the cell is empty
  if (typeof board[cell.target.id] === 'number') {
    // invoke the add function with the index of the cell and the player1
    add(cell.target.id, player1);
    // here if there is no tie, invoke the add function with player2
    if (!checkIfTie()) add(computerTurn(), player2);
  }
}

// add the text on the clicked cell
var add = (cellId, player) => {
  // chanage the value of the clicked cell in the board array with X or O
  board[cellId] = player;
  // write the X or O in the clicked cell
  document.getElementById(cellId).innerText = player;
  // Invoke check function with changed board and the player, to check if there is winner
  var won = check(board, player);
  // if the return value from check is true then invoke gameOver
  if(won) gameOver(won);
}

// check for the winner
var check = (board, player) => {
  // define won with value null as defult
  var won = null;
  // here plays is an array with the indexs of where the player put his X or O
  var plays = board.reduce( (acc, element, index) =>
    (element === player) ? acc.concat(index) : acc, []);
  // looping in the winStuation and compare it with the playes array
  for (var i = 0; i < winStuation.length; i++) {
    var hold = winStuation[i].every( elem =>  plays.indexOf(elem) !== -1 );
    if(hold === true) {
      // here the winner object containes the index of the winStuation and the player
      won = {index: i, player: player};
      break;
    }
  }
  return won;
}

// when one of the players win
var gameOver = (won) => {
// looping in the winStution[won.index]
for (var i =  0; i < winStuation[won.index].length; i++) {
  // change the background color
  document.getElementById(winStuation[won.index][i]).style.backgroundColor = won.player == player1 ? 'green' : 'red';
}

// looping throw the cells and remove the event listener
for (var i = 0; i < cells.length; i++) {
  cells[i].removeEventListener('click', clicked, false);
}
// Invoke the declareWinner
declareWinner(won.player);
}

// to find out wich cell is empty
var emptyCells = () => {
  return board.filter( elem => typeof elem === 'number');
}

// computer play the tern
// here there is no algrothiem just taking the first empty cell :(
var computerTurn = () => {
  return emptyCells()[0];
}

// check if there is any tie
var checkIfTie = () => {
  if (emptyCells().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'yellow';
      cells[i].removeEventListener('click', clicked, false);
    }
    declareWinner('Tie');
    return true;
  }
  return false;
}

// to add the winner name
var declareWinner = (winner) => {
  document.querySelector('.winner').innerText = "Winner: " + winner;
}

// Invoke play function
play();