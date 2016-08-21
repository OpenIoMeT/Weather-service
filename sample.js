var yahooWeather = require('./src/yahooWeather.js');
var place = "New Delhi";

var weather = new yahooWeather();

weather.init(place).then(function(weatherData){
	weather.setWeatherData(weatherData);
	console.log(weather.getLatLong());
});
