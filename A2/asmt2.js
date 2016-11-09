$(document).ready(function () {
  $('#goButton').onclick(function () {
    var latitude = $('#lat').val;
    var longitude = $('#lon').val;
    
  });
  
  function downloadWeather(lat, lon) {
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=43.944847&lon=-78.891703&units=metric&APPID=<a5e028da72423922ec83fb389d5f9864>', function (data) {
      
    });
  }
  
  function downloadForecast(lat, lon) {
    
  }
  
  function showMap(lat, lon) {
    
  }
});

