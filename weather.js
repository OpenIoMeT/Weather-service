"use strict";

var https = require('https');

var yahooWeather = function(){}

var getWeather = function (location) {

	return new Promise( function(response,reject){
		var locationUrl = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+location+'")&format=json&env=store://datatables.org/alltableswithkeys';

		https.get(locationUrl, function (res) {
			res.setEncoding('binary');

			var resData = "";
			res.on('data', function (chunk) {
				return resData += chunk;
			});
			res.on('end', function () {
				var result = JSON.parse(resData);
				response( result );
			});
		});

	});


}

yahooWeather.prototype.getFullWeather = function (location) {
	return new Promise( function(response,reject){
		getWeather(location).then(function(ans){response(ans);});
	});
}

yahooWeather.prototype.getSimpleWeather = function (location) {
	return new Promise( function(response,reject){
		getWeather(location).then( function(yw){
			console.log('yw: ' + yw);
			var ans = {};
			try {
				// try to shorten the calls
				var gen = yw.query.results.channel;
				var info = yw.query.results.channel.item;

				ans.date = info.condition.date;
				ans.location = {lat: info.lat, long: info.long};
				ans.weather = {	temperature: {value: info.condition.temp, units: gen.units.temperature},
								wind: {value: gen.wind.speed, units: gen.units.speed},
								windChill: {value: gen.wind.chill, units: gen.units.temperature},
								condition: info.condition.text
							  };
				ans.forecast = info.forecast;
				console.log('ans: '+ans);
				response(ans);
			} catch(err){
				console.log(err);
			}
		});
	});
}

module.exports = new yahooWeather();
