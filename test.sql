DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

\c test;

CREATE TABLE test1 (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  contact VARCHAR,
  topic VARCHAR,
  message VARCHAR
);

INSERT INTO test1 (name, email, contact, topic, message)
  VALUES ('Samson', 'test@test.com', 'test@test.com', 'Help', 'JK');
