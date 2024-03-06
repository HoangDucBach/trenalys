CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    gmail VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS trends (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    numberOfVotes INTEGER DEFAULT 0,
    description TEXT,
    short_description VARCHAR(85),
);

CREATE TABLE IF NOT EXISTS election_ballots (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    trendId INTEGER REFERENCES trends(id),
    numberOfVotes INTEGER DEFAULT 0,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trend_has_election_ballots (
    trendId INTEGER REFERENCES trends(id),
    electionBallotId INTEGER REFERENCES election_ballots(id),
    PRIMARY KEY (trendId, electionBallotId)
);
CREATE TABLE IF NOT EXISTS USER_VOTE_ELECTION_BALLOTS (
    userId INTEGER REFERENCES users(id),
    electionBallotId INTEGER REFERENCES election_ballots(id),
    PRIMARY KEY (userId, electionBallotId)
);