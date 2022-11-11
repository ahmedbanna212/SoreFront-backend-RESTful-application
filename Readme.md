# RESTful Store Application

## Table of Contents

* [Project Decription](#ProjectDecription)
* [Tools Used](#ToolsUsed)
* [how to setup and connect to the database](#HowToSetup)
* [package installation instructions](#installation_Instructions)
* [ports](#ports)
## ProjectDecription

RESTful storefront application made with TypeScript, Express and SQL database. the project promotes security by hashing user account password and promotes authorization using jsonWebToken to protect endpoints sensitive data. the endpoints and the database functionlates were all tested usinf jasmine unit testing 


## ToolsUsed
* node.js
* express
* bcrypt
* jsonwebtoken
* pg
* db-migrate
* db-migrate-pg
* jasmine
* supertest
* typescript

# HowToSetup
1. Create a PostGres database  named `store`
    * type `psql -U postgres` to enter the dafult user of postgres
    * type `CREATE DATABASE store;` to create the database
    * type `CREATE DATABASE store_test;` to create the testing database
    * type `\c store` to connect to the database
2. Run migration comand => `db-migrate up`
3. Create a user to be authorized to use other endpoints " you will find this part commented in `server.ts`"
4. start the server by runing  => `npm run start`
5. for testing just run => `npm run test` , and you dont have to do anything else
# ports
Database port  :  `5432`

Server port  :  `3000`

# installation_Instructions
clone the progect and  just run command => `npm install`
