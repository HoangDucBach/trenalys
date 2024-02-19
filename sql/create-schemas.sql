CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS trends (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    numberOfVotes INTEGER,
    description TEXT
);

CREATE TABLE IF NOT EXISTS trend_tag(
	id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS trend_has_tag (
    trend_id INTEGER REFERENCES trends(id),
    trend_tag_id INTEGER REFERENCES trend_tag(id),
    PRIMARY KEY (trend_id, trend_tag_id)
);
