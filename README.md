
# Inventory Manager

An inventory manager app made to practice a layered server architecture using Node.js and Express, as well as a bare-bones React frontend to test the server.

## Demo

A live version of the app can be found at [https://emunib-shopify-backend-challenge.netlify.app](https://emunib-shopify-backend-challenge.netlify.app)

## Environment Variables

To run this project locally, you will need to add the following environment variables to a .env file located in the server directory:

```
PORT=8080
DB_URI=<A MondoDB connection URI>
```
The `DB_URI` can be any valid URI to a local or cloud based MongoDB database. A new, free, cloud based database can easily be set up at [MondoDB](https://www.mongodb.com/) after signing up.

## Usage

To clone and run this project you will need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/).

Also, you will need set up a .env file as shown above.

To run the project run the following:

```bash
# clone the repository
$ git clone https://github.com/emunib/shopify-backend-challenge.git

# go into the server
$ cd shopify-backend-challenge/server

# install server dependencies
$ npm install

# start the server
$ npm start

# go into the client
$ cd ../client

# install client dependencies
$ npm install

# start the client
$ npm start
```

You can go to [http://localhost:3000/](http://localhost:3000/) to use the app.

## Contact

This web app was designed and developed by Ehtasham Munib.

You can follow me on [LinkedIn](https://www.linkedin.com/in/emunib/).
