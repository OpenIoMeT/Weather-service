(function() {
'use strict';

const request = require('superagent');

class Weather {

	fetch(userArea) {
		var yahooapis = 'https://query.yahooapis.com/v1/public/yql?q=';
		var yql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + userArea + '")';
		var dataformat = 'json';
		var queryurl = yahooapis + yql + '&format=' + dataformat;

		return new Promise((response,reject) => {
			request
				.get(queryurl)
				.end((err, res) => response(JSON.parse(res.text)));
		}).then((weatherData) => {
			this.setWeatherData(weatherData);
		});
	}

	setWeatherData(weatherData) {
		this.fullWeatherObject = weatherData.query.results.channel;
		this.weatherItem = weatherData.query.results.channel.item;
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

module.exports = Weather;
}(this));
