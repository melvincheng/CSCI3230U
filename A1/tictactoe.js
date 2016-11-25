window.onload = function () {
  var cells = document.getElementsByTagName('td');
  var mess = document.getElementById('message');
  var button = document.getElementById('button');
  var turn = 'O';
  var finish = false;
  for (var i = 0; i < cells.length; i++) {
    cells.item(i).onclick = function () {
      if (finish) {
        return;
      }
      var currentCell = event.target;
      if (currentCell.textContent != '') {
        return;
      }
      currentCell.textContent = turn;
      
      if(winCheck() || tieCheck()) {
        button.style.visibility = 'visible';
        return;
      }
      
      if (turn == 'O') {
        turn = 'X';
        mess.textContent = 'It\'s \'X\'s turn!';
      } else {
        turn = 'O';
        mess.textContent = 'It\'s \'O\'s turn!';
      }
    };
  }
  function winCheck() {
    var cell1 = cells.item(0);
    var cell2 = cells.item(4);
    var cell3 = cells.item(8);
    if(match(cell1,cell2,cell3)){
      console.log('diag1');
      return true;
    }
    cell1 = cells.item(2);
    cell2 = cells.item(4);
    cell3 = cells.item(6);
    if(match(cell1,cell2,cell3)){
      console.log('diag2');
      return true;
    }
    
    for (var i = 0; i < cells.length; i += 3) {
      cell1 = cells.item(i);
      cell2 = cells.item(i + 1);
      cell3 = cells.item(i + 2);
      if(match(cell1, cell2, cell3)) {
        console.log('h');
        return true;
      }
    }
    for (var i = 0; i < cells.length/3; i++) {
      cell1 = cells.item(i);
      cell2 = cells.item(i + 3);
      cell3 = cells.item(i + 6);
      if(match(cell1, cell2, cell3)) {
        console.log('v');
        return true;
      }
    }
  }
  
  function match(cell1, cell2, cell3) {
    var cell1Text = cell1.textContent;
    var cell2Text = cell2.textContent;
    var cell3Text = cell3.textContent;
    if (cell1Text != '' && cell1Text == cell2Text && cell2Text == cell3Text) {
      mess.textContent = '\'' + cell1Text + '\' is the winner!';
      cell1.className = 'win';
      cell2.className = 'win';
      cell3.className = 'win';
      finish = true;
      return true;
    }
  }
  function tieCheck() {
    for (var i = 0 ; i < cells.length; i++) {
      if (cells.item(i).textContent == '') {
        return false;
      }
    }
    mess.textContent = 'Tie game!';
    finish = true;
    return true;
  }
  
  button.onclick = function () {
    finish = false;
    turn = 'O'
    mess.textContent = 'It\'s \'O\'s turn!';
    button.style.visibility = 'hidden';
    for (var i = 0 ; i < cells.length; i++) {
      cells.item(i).textContent = '';
      cells.item(i).removeAttribute('class');
    }
  }
};