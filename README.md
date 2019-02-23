# accenture-api-
Backend for the Accenture modern ticket system 

Dependences:
- ExpressJS
- bluebird
- Knex.js
- nodemon
- pg-promise

## Steps
1) Install PostgreSQL.
2) Build SQL "test" database and table with test.sql in root directory. (In Linux, the command is 'psql postgres *username* < test.sql')
3) To run ExpressJS server, go to root directory and type "npm start" in the terminal.
4) Send data to "test1" table in "test" database through ExpressJS server in command line with 'curl --data "name=test&email=test@test.com&contact=test@test.com&topic=test&message=test" "http://*server*:*port*/*route*" '
