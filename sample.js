var yahooWeather = require('./src/yahooWeather.js');
var place = "New Delhi";

var weather = new yahooWeather();

weather.fetch(place).then(function(){
	console.log(weather.getLatLong());
});
