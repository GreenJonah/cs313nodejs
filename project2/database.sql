CREATE DATABASE shim;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE bike (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  users_id INT NOT NULL REFERENCES users(id)
);

CREATE TABLE shim (
  id SERIAL NOT NULL PRIMARY KEY,
  intake_tolorance FLOAT(3) NOT NULL,
  exhaust_tolorance FLOAT(3) NOT NULL,
  inR FLOAT(3),
  inL FLOAT(3),
  exR FLOAT(3),
  exL FLOAT(3),
  bike_id INT NOT NULL REFERENCES bike(id)
);

INSERT INTO users (username, email, password) VALUES ('John', 'generic@gmail.com', 'a');
INSERT INTO bike (name,  users_id) VALUES ('honda', '.006', '.011', 1);
INSERT INTO shim (intake_tolorance, exhaust_tolorance, inR, inL, exR, exL, bike_id) VALUES (.04, .06, .015, .014, 2);

GRANT SELECT, INSERT, UPDATE ON users TO ta_user;
GRANT SELECT, INSERT, UPDATE ON users TO ta_user;
GRANT SELECT, INSERT, UPDATE ON bike TO ta_user;
GRANT SELECT, INSERT, UPDATE ON bike TO ta_user;
GRANT SELECT, INSERT, UPDATE ON shim TO ta_user;
GRANT SELECT, INSERT, UPDATE ON shim TO ta_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ta_user;
