window.onload = function () {
  var table = document.getElementsByTagName("tr");
  var topHeaders = table.item(0).getElementsByTagName("th");
  var cells = document.getElementsByTagName("td");
  var columnHeaders = [];
  var rowHeaders = [];
  var previous;
  
  
  for (var i = 1; i < table.length; i++) {
    var currHeader = topHeaders.item(i);
    currHeader.tabIndex = i;
    columnHeaders.push(currHeader);
    columnHeaders[i - 1].addEventListener('click', function () {
      if (previous !== event.target) {
        unselect();
      }
      var tabIndex = event.target.tabIndex;
      for (var i = 1; i < table.length; i++) {
        var selected = table.item(i).getElementsByTagName("td").item(tabIndex - 1);
        if (selected.className === "selected"){
          selected.className = "";
        } else {
          selected.className = "selected";
        }
      }
      previous = event.target;
    }, false);
  }
  
  
  for (var i = 1; i < table.length; i++) {
    var currheader = table.item(i).getElementsByTagName("th").item(0);
    currheader.tabIndex = i;
    rowHeaders.push(currheader);
  }
  
  for (var i = 0; i < rowHeaders.length; i++) {
    rowHeaders[i].addEventListener('click', function () {
      if (previous !== event.target) {
        unselect();
      }
      var tabIndex = event.target.tabIndex;
      for (var j = 0; j < table.length - 1; j++) {
        var selected = table.item(tabIndex).getElementsByTagName("td").item(j);
        if (selected.className === "selected"){
          selected.className = "";
        } else {
          selected.className = "selected";
        }
      }
      previous = event.target;
    }, false);
  }
  
  
  for (var i = 0; i < cells.length; i++){
    cells.item(i).addEventListener('click', function () {
      var cell = event.target;
      if (previous !== cell) {
        unselect();
      }
      if (cell.className === "selected") {
        cell.className = ""
      } else {
        cell.className = "selected";  
      }
      previous = cell;
    },false);
  }
  
  var unselect = function () {
    for (var i = 0; i < cells.length; i++) {
        cells.item(i).className = "";
    }
  };
};
