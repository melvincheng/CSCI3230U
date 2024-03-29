window.onload = function () {
  var table = document.getElementsByTagName("tr");
  var topHeaders = table.item(0).getElementsByTagName("th");
  var cells = document.getElementsByTagName("td");
  var previous;
  
  for (var i = 1; i < topHeaders.length; i++) {
    topHeaders.item(i).tabIndex = i;
    topHeaders.item(i).onclick = function () {
      clearCheck(event.target)
      for (var i = 1; i < table.length; i++) {
        var row = table.item(i).getElementsByTagName("td");
        var cell = row.item(event.target.tabIndex - 1);
        cellChange(cell);
      }
      previous = event.target;
    };
  }
  
  for (var i = 1; i < table.length; i++) {
    var rowHeaders = table.item(i).getElementsByTagName("th").item(0);
    rowHeaders.tabIndex = i;
    rowHeaders.onclick = function () {
      clearCheck(event.target);
      var row = table.item(event.target.tabIndex).getElementsByTagName("td");
      for (var i = 0; i < row.length; i++) {
        var cell = row.item(i);
        cellChange(cell);
      }
      previous = event.target;
    };
  }
  
  for (var i = 0; i < cells.length; i++) {
    cells.item(i).onclick = function () {
      clearCheck(event.target);
      var cell = event.target;
      cellChange(cell);
      previous = event.target;
    };
  }
  
  function clearCheck(newEvent) {
    if (previous != newEvent) {
      for (var i = 0; i < cells.length; i++) {
        cells.item(i).className = "";
      }
    }
  }
  
  function cellChange(cell) {
      if (cell.className == "") {
        cell.className = "selected";
      } else {
        cell.className = "";
      }
  }
};