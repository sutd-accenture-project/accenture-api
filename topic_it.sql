DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

\c test;

CREATE TABLE topic_it (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  contact VARCHAR,
  topic VARCHAR,
  message VARCHAR
);

INSERT INTO topic_it (name, email, contact, topic, message)
  VALUES ('Samson', 'test@test.com', 'test@test.com', 'IT', 'Account blocked');