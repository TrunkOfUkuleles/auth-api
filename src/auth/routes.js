'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../models/data-collection.js');

const v2 = express.Router();

const models = new Map();



v2.param('model', (req, res, next) => {
    const modelName = req.params.model;
    if (models.has(modelName)) {
      req.model = models.get(modelName);
      next();
    } else {
      const fileName = `${__dirname}/../models/${modelName}/model.js`; //this is wild
      if (fs.existsSync(fileName)) {
        const model = require(fileName);
        models.set(modelName, new Collection(model));
        req.model = models.get(modelName);
        next();
      }
      else {
        next("Invalid Model");
      }
    }
  });

  v2.post('/:model/signup', handleSignUp);
  v2.post('/:model/signin/', handleSignIn);
  v2.get('/:model/users', getUsers);
  v2.get('/:model/secret', getSecret);


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
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function getSecret(req, res) {
    console.log('USER', req.user);
    res.status(200).send('Shhhhhh');
}



module.exports = v2;