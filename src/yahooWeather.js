(function() {
'use strict'

const request = require('superagent');

class weather {

	constructor(userArea) {
		this.userArea = userArea;
	}

	init(weatherData) {
		this.fullWeatherObject = weatherData.query.results.channel;
		this.weatherItem = weatherData.query.results.channel.item;
	}

	getWeather() {
		return new Promise((response,reject) => {
			var apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=';
			var yql = apiUrl + 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+this.userArea+'")&format=json';

			request
			 	.get(yql)
				.end((err, res) => response(JSON.parse(res.text)));
		});
	}

	getFullWeather() {
		return new Promise((response,reject) => {
			this.getWeather().then(function(ans){
				response(ans);
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
}(this));
