# accenture-api-
Backend for the Accenture modern ticket system 

Dependences:
- ExpressJS
- Knex.js
- nodemon
- pg
- bcrypt
- express-brute
- cors
- passport
- jsonwebtoken

## Steps
1) Install dependencies.
2) Create accounts and accounts_test databases.
3) Change settings in knexfile.js in root directory.
3) Run "knex migrate:latest" in the terminal.
4) To run ExpressJS server, go to root directory and type "npm start" in the terminal.
5) Sign up by sending data to "user" table in "accounts" database through the ExpressJS server in terminal with 'curl --data "email=test@test.com&password=12345678" "http://*server*:*port*/auth/signup" '
6) Log in by sending data to "user" table in "accounts" database through the ExpressJS server in terminal with 'curl --data "email=test@test.com&password=12345678" "http://*server*:*port*/auth/login" '

## Tutorials
- Knex.js: http://perkframework.com/v1/guides/database-migrations-knex.html
- ExpressJS: https://expressjs.com/en/starter/installing.html
- expess-brute: https://www.npmjs.com/package/express-brute
- System: https://www.youtube.com/watch?v=H7qkTzxk_0I&t=756s