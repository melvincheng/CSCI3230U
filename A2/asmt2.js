$(document).ready(function () {
  downloadWeather(43.944847, -78.891703);
  $('#goButton').onClick = function () {
    var lat = $('#lat').val;
    var lon = $('#lon').val;
    console.log('clicked');
    downloadWeather(lat, lon);
    downloadForecast(lat, lon);
    showMap(lat, lon);
  };
  
  function downloadWeather(lat, lon) {
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=43.944847&lon=-78.891703&units=metric&APPID=a5e028da72423922ec83fb389d5f9864', function (data) {
      var main = $(data)[0].main;
      
      var wind = $(data)[0].wind;
      
      var currTemp = main.temp;
      var minTemp = main.temp_min;
      var maxTemp = main.temp_max;
      
      var outlook = $(data)[0].weather.description;
      
      var direction = wind.deg;
      var speed = wind.speed;
      
      var pressure = main.pressure;
      
      var humidity = main.humidity;
      
      
      var tempDiv = $('<div>');
      var tempContent = $('<div>');
      var tempH2 = $('<h2>');
      tempH2.append('Temperature')
      tempContent.append($('<div>').append('Current: ' + currTemp + '&deg;C'));
      tempContent.append($('<div>').append('Low: ' + minTemp + '&deg;C'));
      tempContent.append($('<div>').append('High: ' + maxTemp + '&deg;C'));
      tempDiv.append(tempH2);
      tempDiv.append(tempContent);
      
      var outlookDiv = $('<div>');
      var outlookContent = $('<div>');
      var outlookH2 = $('<h2>');
      outlookH2.append('Outlook');
      outlookContent.append($('<div>').append(outlook));
      outlookDiv.append(outlookH2);
      outlookDiv.append(outlookContent);
      
      var windDiv = $('<div>');
      var windContent = $('<div>');
      var windH2 = $('<h2>');
      windH2.append('Wind');
      windContent.append($('<div>').append('Direction: ' + direction + '&deg;'));
      windContent.append($('<div>').append('Speed: ' + speed + 'm/s'));
      windDiv.append(windH2);
      windDiv.append(windContent);
      
      var pressureDiv = $('<div>');
      var pressureContent = $('<div>');
      var pressureH2 = $('<h2>');
      pressureH2.append('Pressure');
      pressureContent.append($('<div>').append(pressure + 'mB'));
      pressureDiv.append(pressureH2);
      pressureDiv.append(pressureContent);
      
      var humidityDiv = $('<div>');
      var humidityContent = $('<div>');
      var humidityH2 = $('<h2>');
      humidityH2.append('Humidity');
      humidityContent.append($('<div>').append(humidity + '%'));
      humidityDiv.append(humidityH2);
      humidityDiv.append(humidityContent);
      
      var weatherDiv = $('#weather');
      weatherDiv.append(tempDiv);
      weatherDiv.append(windDiv);
      weatherDiv.append(pressureDiv);
      weatherDiv.append(humidityDiv);
      
    });
  }
  
  function downloadForecast(lat, lon) {
    
  }
  
  function showMap(lat, lon) {
    
  }
});