$(document).ready(function () {
  $('#weather').hide();
  $('#goButton').click(function () {
    $('#weather').show();
    var lat = $('#lat').val();
    var lon = $('#lon').val();
    $('#map-canvas').html('');
    $('#weather').html('');
    $('#forecast').html('');
    downloadWeather(lat, lon);
    downloadForecast(lat, lon);
    showMap(lat, lon);
  });
  
  function downloadWeather(lat, lon) {
    $.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&APPID=a5e028da72423922ec83fb389d5f9864', function (data) {
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
    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?cnt=10&mode=xml&lat='+lat+'&lon='+lon+'&units=metric&APPID=a5e028da72423922ec83fb389d5f9864', function (data) {
      var forecast = $('<table>');
      var headers = $('<tr>');
      headers.append($('<th>').append('Date'));
      headers.append($('<th>').append('Symbol'));
      headers.append($('<th>').append('High'));
      headers.append($('<th>').append('Low'));
      headers.append($('<th>').append('Wind'));
      headers.append($('<th>').append('Clouds'));
      forecast.append(headers);
      
      $(data).find('time').each(function(data) {
        var info = $('<tr>')
        info.append($('<td>').append($(this)[0].getAttribute('day')));
        info.append($('<td>').append($('<img>').attr('src', 'images/' + $(this).find('symbol')[0].getAttribute('number') + '.png')));
        info.append($('<td>').append($(this).find('temperature')[0].getAttribute('max') + '&deg;C'));
        info.append($('<td>').append($(this).find('temperature')[0].getAttribute('min') + '&deg;C'));
        info.append($('<td>').append($(this).find('windSpeed')[0].getAttribute('name')));
        info.append($('<td>').append($(this).find('clouds')[0].getAttribute('value')));
        
        forecast.append(info);
      });
      forecast.addClass('table');
      $('#forecast').append(forecast);
      
    });
  }
  
  function showMap(lat, lon) {
    console.log(lat);
    console.log(parseFloat(lat,10));
    console.log(lon);
    console.log(parseFloat(lon,10));
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: parseFloat(lat,10), lng: parseFloat(lon,10)},
      zoom: 12
    });
  }
});