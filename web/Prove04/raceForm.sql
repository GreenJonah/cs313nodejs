#Create the database
CREATE DATABASE raceForm;

#Connect to the database
\c raceform


# Bikes Table
CREATE TABLE public.bikes (
	id SERIAL NOT NULL PRIMARY KEY,
	type VARCHAR(5)	
);

# Races Table
CREATE TABLE public.races (
	id SERIAL NOT NULL PRIMARY KEY,
	type VARCHAR(20),
	date DATE
);

# Racers table
CREATE TABLE public.racers(
	id SERIAL NOT NULL PRIMARY KEY,
	firstName VARCHAR(100) NOT NULL,
	lastName  VARCHAR(100) NOT NULL,
	password  VARCHAR(100) NOT NULL,
	races_id  INT NOT NULL REFERENCES public.races(id),
	bikes_id  INT NOT NULL REFERENCES public.bikes(id)
);