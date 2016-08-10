'use strict'

var https = require('https');

class weather {
	constructor(userArea) {
		this.weatherCondition = [
			"tornado", "tropical storm", "hurricane", "severe thunderstorms", "thunderstorms", "mixed rain and snow",
			"mixed rain and sleet", "mixed snow and sleet", "freezing drizzle", "drizzle", "freezing rain", "showers", "showers",
			"snow flurries", "light snow showers", "blowing snow", "snow", "hail", "sleet", "dust", "foggy", "haze", "smoky", "blustery",
			"windy", "cold", "cloudy", "mostly cloudy (night)", "mostly cloudy (day)", "partly cloudy (night)", "partly cloudy (day)",
			"clear (night)", "sunny", "fair (night)", "fair (day)", "mixed rain and hail", "hot", "isolated thunderstorms",
			"scattered thunderstorms", "scattered thunderstorms", "scattered showers", "heavy snow", "scattered snow showers", "heavy snow",
			"partly cloudy", "thundershowers", "snow showers", "isolated thundershowers"
		];
		
		this.userArea = userArea;
		this.fullWeatherObject = this.getFullWeather().then((weatherData) => weatherData.query.results.channel);
		this.weatherItem = this.fullWeatherObject.item;

	};


	getFullWeather() {
		return new Promise( function(response,reject){
			var yahooQueryLang = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+this.userArea+'")';
			var locationUrl = 'https://query.yahooapis.com/v1/public/yql?q="' + yahooQueryLang +'"&format=json&env=store://datatables.org/alltableswithkeys';

			https.get(locationUrl, function (res) {
				res.setEncoding('binary');

				var resData = "";
				res.on('data', function (chunk) {
					return resData += chunk;
				});
				res.on('end', function () {
					var result = JSON.parse(resData);
					response(result);
				});
			});
		});
	}

	getUserLocation() {
		return this.fullWeatherObject.location;
	}

	getForecastUnits() {
		return this.fullWeatherObject.units;
	}

	getWindCondition() {
		return this.fullWeatherObject.wind;
	}

	getAstronomy() {
		return this.fullWeatherObject.astronomy;
	}

	getLatLong() {
		var coordinates = {
			latitude: this.weatherItem.lat,
			longitude: this.weatherItem.long
		};

		return coordinates;
	}

	getQueryTitle() {
		return this.weatherItem.title;
	}

	getTodayCondition() {
		return this.weatherItem.condition;
	}

	getForecast() {
		return this.weatherItem.forecast;
	}

}

module.exports = weather;