var yw = require('./weather.js');

yw.getFullWeather('New Delhi', 'IN').then(function(res){
	var ch = res.query.results.channel;
	for(var i in ch){
		console.log(ch[i]);
	}
});
