<?php
/**********************************************************
* File: dbConnect.php
* Author: Br. Burton
* 
* Description: Shows how to connect using either local
* OR Heroku credentials, depending on whether the code
* is executing at heroku.
***********************************************************/
function get_db() {
	$db = NULL;
	try {
		// default Heroku Postgres configuration URL
		$dbUrl = getenv("DATABASE_URL");
		//$db = pg_connect("host=localhost dbname=postgres user=postgres password=$password");
		if (!isset($dbUrl) || empty($dbUrl)) {
			// example localhost configuration URL with user: "ta_user", password: "ta_pass"
			// and a database called "scripture_ta"
			$dbUrl = "postgres://ta_user:ta_pass@localhost:80/raceform";
		}
		
		$dbopts = parse_url($dbUrl);
		print "<p>$dbUrl</p>\n\n";
		$dbHost = $dbopts["host"];
		$dbPort = $dbopts["port"];
		$dbUser = $dbopts["user"];
		$dbPassword = $dbopts["pass"];
		$dbName = ltrim($dbopts["path"],'/');
		// Create the PDO connection
		print "<p>pgsql:host=$dbHost;port=$dbPort;dbname=$dbName</p>\n\n";
		$db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);
		// this line makes PDO give us an exception when there are problems, and can be very helpful in debugging!
		$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	}
	catch (PDOException $ex) {
		// If this were in production, you would not want to echo
		// the details of the exception.
		echo "Error connecting to DB. Details: $ex";
		die();
	}
	return $db;
}