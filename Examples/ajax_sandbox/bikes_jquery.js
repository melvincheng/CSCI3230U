$(document).ready(function () {
  $('#download').click(function () {
    $.get('http://localhost/ajax/stations.xml', function (data) {
      var table = $('<table class="table">');
      var thead = $('<thead>');
      table.append(thead);
      var headerRow = $('<tr>');
      thead.append(headerRow);
      var latHeader = $('<th>');
      latHeader.text('Latitude');
      headerRow.append(latHeader);
      var lonHeader = $('<th>').text('Longitude');
      headerRow.append(lonHeader);
      var numHeader = $('<th>').text('# Bikes');
      headerRow.append(numHeader);
      
      var tbody = $('<tbody>');
      table.append(tbody);
      
      // dynamically insert the bike station data
      $(data).find('station').each(function (index, station) {
        var lat = $(station).find('lat').text();
        var lon = $(station).find('long').text();
        var num = $(station).find('nbBikes').text();
        
        var tr = $('<tr>');
        tbody.append(tr);
        
        var latTd = $('<td>').text(lat);
        tr.append(latTd);
        
        var lonTd = $('<td>').text(lon);
        tr.append(lonTd);
        
        var numTd = $('<td>').text(num);
        tr.append(numTd);
      });
      
      
      $('#bikeData').append(table);
    });
  });
});