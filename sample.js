var yahooWeather = require('./src/yahooWeather.js');
var place = "New Delhi";

yahooWeather.init(place).then(function(weatherData){
	yahooWeather.setWeatherData(weatherData);
	console.log(yahooWeather.getLatLong());
});
