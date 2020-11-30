## Description

[Nest](https://github.com/nestjs/nest) TypeScript framework starter repository, with basic user/auth/jwt implementation. <br>
Also comes with swagger build in. <br>
After docker installation, you can see the project at [localhost:5000/apidocs](http://localhost:5000/apidocs/#/). <br>
This repository uses bind mounts for development, so you can see right away your changes in the code, in the above link. <br>


## .env (JWT Secret)

To run the project, you must make a **.env** file in the root directory, with the following property: <br>
```bash
JWT_SECRET=<secret goes here>
```


## Database

To run the project, database expects to have a **mysql.env** file in the root directory, with the following properties: <br>
```bash
MYSQL_ROOT_PASSWORD=<your root password>
MYSQL_DATABASE=nestjs-backbone
MYSQL_USER=admin
MYSQL_PASSWORD=<your password>
```
Also, change the **password** entity in **ormconfig.json**, with your password.


## Docker Installation

The project can be run in Docker. Simply run the following command, inside the project folder: 
```bash
$ docker-compose up -d --build
```


## Installation (without docker)

You must run a local mysql server, so that the project can start correctly. <br>
In **ormconfig.json** change the **host** parameter  to **localhost** and then run the following command, inside the project folder:
```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Running migrations
```bash
# create
$ npm run migration:create

# generate
$ npm run migration:generate
e.g. npm run migration:generate CreateUserTable

# create
$ npm run migration:run

# create
$ npm run migration:revert

```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

  Nest is [MIT licensed](LICENSE).
