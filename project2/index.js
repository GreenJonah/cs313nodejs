var path = require('path');
var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const connectionString = process.env.DATABASE_URL || "postgres://ta_user:ta_pass@localhost:5432/shim";

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname + '/public')));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/addUser', function(request, response) {
    addUser(request, response);
});

app.post('/login', function(request, response) {
	getUser(request, response);
});

app.post('/addBike', function(request, response) {
  addBike(request, response);
});

app.get("/getBike", function(request, response) {
	getBike(request, response);
});

app.get('/getShim', function(request, response) {
	getShim(request, response);
});

function addUser(request, response) {
    var username = request.body.userName;
    var email = request.body.email;
    var pass = request.body.password;

    addUserToDb(username, email, pass, function(error, result) {
      if (error || result == null) {
        response.status(200).json({success: false});
      } else {
        response.status(200).json({success: true});
      }
    });
}

function addUserToDb(username, email, pass, callback) {
  console.log("Adding username email and pass from DB: " + username + ' ' + email + ' ' + pass);

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }

    var sql = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

    var params = [username, email, pass];
    var query = client.query(sql, params, function(err, result) {

      client.end(function(err) {
        if (err) throw err;
      });

      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }

      callback(null, result.rows);
    });
  });
} // End of addUser

function addBike(request, response) {
    var userId = request.body.id;
    var  bikeName = request.body.bikeName;

    addBikeToDb(userId, bikeName, function(error, result) {
      if (error || result == null) {
        response.status(500).json({success: false});
      } else {
        response.status(200).json({success: true});
      }
    });
}

function addBikeToDb(userId, bikeName, callback) {
  console.log("Adding user_id and newBike to DB: " + userId + ' ' + bikeName);

  var client = new pg.Client(connectionString);
  client.connect(function(err) {
    if (err) {
      console.log("Error connecting to DB: ")
      console.log(err);
      callback(err, null);
    }

  var sql = "INSERT INTO bike (name, users_id) VALUES ($1, $2)";

    var params = [bikeName, userId];
    var query = client.query(sql, params, function(err, result) {

      client.end(function(err) {
        if (err) throw err;
      });

      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }

      callback(null, result.rows);
    });
  });
} // End of addUser


function getUser(request, response) {
	// First get the person's id
	var email = request.body.email;
  var pass = request.body.password;

	getUserFromDb(email, pass, function(error, result) {
		if (error || result == null || result.length != 1) {
			response.status(200).json({success: false, data: error});
		} else {
			response.status(200).json(result[0]);
		}
	});
}

function getBike(request, response) {
	var id = request.query.id;
	getBikeFromDb(id, function(error, result) {
		if (error || result == null) {
			response.status(500).json({success: false, data: error});
		} else {
			response.status(200).json(result);
		}
	});
}

function getShim(request, response) {
	var id = request.query.id;
	getShimFromDb(id, function(error, result) {
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getUserFromDb(email, pass, callback) {

	console.log("Getting person's email and pass from DB:" + email + ' ' + pass);

  var client = new pg.Client(connectionString);
	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

    var sql = "SELECT id, username, email, password FROM users WHERE email = $1 AND password = $2";
		var params = [email, pass];
		var query = client.query(sql, params, function(err, result) {

			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			callback(null, result.rows);
		});
	});

} // end of getUserFromDb

function getBikeFromDb(id, callback) {
	console.log("Getting bikes where user id = " + id);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, name FROM bike WHERE users_id = $1";
		var params = [id];
      console.log(sql);

		var query = client.query(sql, params, function(err, result) {

			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

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
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			callback(null, result.rows);
		});
	});

} // end of getShimFromDb
