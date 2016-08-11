var yahooWeatherShim = require('./src/yahooWeather.js');
var place = "New Delhi";

var weatherData = new yahooWeatherShim(place);

weatherData.getFullWeather().then(function(res){
	weatherData.init(res);
	console.log(weatherData.getForecast());
});