'use strict';

// const fs = require('fs');
const express = require('express');
// const Collection = require('../models/data-collection.js');
const basicAuth = require('./middleware/basicAuth.js')
const bearerAuth = require('./middleware/bearerAuth.js')
const v2 = express.Router();
const Users = require('./models/user.js')
// const models = new Map();



// v2.param('model', (req, res, next) => {
//     const modelName = req.params.model;
//     if (models.has(modelName)) {
//       req.model = models.get(modelName);
//       next();
//     } else {
//       const fileName = `${__dirname}/../models/${modelName}/model.js`; //this is wild
//       if (fs.existsSync(fileName)) {
//         const model = require(fileName);
//         models.set(modelName, new Collection(model));
//         req.model = models.get(modelName);
//         next();
//       }
//       else {
//         next("Invalid Model");
//       }
//     }
//   });

  v2.post('/signup', handleSignUp);
  v2.post('/signin/', basicAuth, handleSignIn);
  v2.get('/users', bearerAuth, getUsers);
  v2.get('/secret', bearerAuth, getSecret);


async function handleSignUp(req, res) {
    try {
        const user = new Users(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

async function handleSignIn(req, res) {
    console.log('USER', req.user);
    res.status(200).json(req.user);
}

async function getUsers(req, res) {
    const users = await Users.find({});
    const list = users.map(user => user.username);
  res.status(201).json(list);
}

async function getSecret(req, res) {
    console.log('USER', req.user);
    res.status(200).send('Shhhhhh');
}



module.exports = v2;