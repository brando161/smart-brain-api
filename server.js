import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.cjs');
const signin = require('./controllers/signin.cjs');
const profile = require('./controllers/profile.cjs');
const image = require('./controllers/image.cjs');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {res.json("Success");});
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});