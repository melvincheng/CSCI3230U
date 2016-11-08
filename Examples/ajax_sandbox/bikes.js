window.onload = function () {
  var downloadButton = 
   document.getElementById('download');
  
  downloadButton.onclick = function () {
    // post back
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var ol = '<ol>';
          var numBikes = request.responseXML.getElementsByTagName('nbBikes');
          for (var i = 0; i < numBikes.length; i++) {
            ol += '<li>' + numBikes[i].textContent + '</li>';
          }
          ol += '</ol>';
          var bikeData = document.getElementById('bikeData');
          bikeData.innerHTML = ol;
        }
      }
    };
    request.open('GET', 'stations.xml', true);
    request.send();
  };
};