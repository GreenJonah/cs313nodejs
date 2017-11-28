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


/*var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://ta_user:ta_pass@localhost:5432/shim";

//app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getUser', function(request, response) {
	console.log('Node hello');
	//getUser(request, response);
});

app.get('/getBike', function(request, response) {
	getBike(request, response);
});

app.get('/getShim', function(request, response) {
	getShim(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getUser(request, response) {
	// First get the person's id
	var id = request.query.id;

	// use a helper function to query the DB, and provide a callback for when it's done
	getUserFromDb(id, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getBike(request, response) {
	var id = request.query.id;
	getBikeFromDb(id, function(error, result) {
		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getShim(request, response) {
	var id = request.query.id;
	getShimFromDb(id, function(error, result) {
		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getUserFromDb(id, callback) {

	console.log("Getting person from DB with id: " + id);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, username, email, password FROM users WHERE id = $1::int";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});

} // end of getUserFromDb

function getBikeFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, name, intake_tolorance, exhaust_tolorance FROM bike WHERE id = $1::int";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});
} // end of getBikeFromDB

function getShimFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, inR, inL, exR, exL, bike_id FROM shim WHERE id = $1::int";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});

} // end of getShimFromDb
*/
