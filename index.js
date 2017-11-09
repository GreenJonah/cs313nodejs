var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/price', function(request, response) {
	getPrice(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getPrice(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	// TODO: Here we should check to make sure we have all the correct parameters

	var type = requestUrl.query.type;
	var weight = Number(requestUrl.query.weight);

	computePrice(response, type, weight);
}

function computePrice(response, type, weight) {
	type = type.toLowerCase();

	var result = 0.00;
	var cap = 0;
	if (type == "parcels") {
		result = 3.00;
		cap = 13;
		for (var i = 4; i < weight && i < cap; i++) {
			if (i < 10)
				result += .16;
			if (i == 10)
				result += .23;
			if (i > 10)
				result += .17;
		}
	}
	else {
		if (type == "letters(stamped)") {
			result = 0.49;
			cap = 4;
		} else if (type == "letters(metered)") {
			result = 0.46;
			cap = 4;
		} else if (type == "large envelopes (flats)") {
			result = .98;
			cap = 13;
		}
		for (var i = 1; i < weight && i < cap; i++) {
			result += .21;
		}
	}
	result = result.toFixed(2);
	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {type: type, weight: weight, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}
