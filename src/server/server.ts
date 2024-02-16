import {client} from "./models/connect.model";
const query= `
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        gmail VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE trends(
        id SERIAL PRIMARY KEY,
        description TEXT,
        time_created TIMESTAMP,
        number_of_votes INT
    );
    CREATE TABLE trend_items(
        id SERIAL PRIMARY KEY,
        number_of_votes INT
    );
    CREATE TABLE trend_tags(
        id SERIAL PRIMARY KEY
    );
    CREATE TABLE user_follow_trend(
        user_id INT,
        trend_id INT
    );
    CREATE TABLE trend_has_tag(
        trend_id INT,
        tag_id INT
    );
    CREATE TABLE trend_has_item(
        trend_id INT,
        item_id INT
    );
    CREATE TABLE user_follow_item(
        user_id INT,
        item_id INT
    );
    CREATE TABLE user_follow_tag(
        user_id INT,
        tag_id INT
    );
`;
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    client.end();
});
