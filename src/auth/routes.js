'use strict';

const express = require('express');
const basicAuth = require('./middleware/basicAuth.js')
const bearerAuth = require('./middleware/bearerAuth.js')
const v2 = express.Router();
const Users = require('./models/user.js')
const acler = require('./middleware/acl.js')

  v2.post('/signup', handleSignUp);
  v2.post('/signin/', basicAuth, acler('read'), handleSignIn);
  v2.get('/users', bearerAuth, acler('read', 'create'), getUsers);
  v2.get('/secret', bearerAuth, acler('read', 'create'), getSecret);
  v2.delete('/delete', bearerAuth, acler('read', 'create', 'update', 'delete'), deleteThing);
  v2.put('/update', bearerAuth, acler('read', 'create', 'update'), updateThing);


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
  res.status(200).json(list);
}

async function getSecret(req, res) {
    console.log('SECRET', req.user);
    res.status(200).send('Shhhhhh');
}

async function updateThing(req, res) {
    console.log('USER', req.user);
    res.status(200).send('UPDATED');
}

async function deleteThing(req, res) {
    console.log('DELETE', req.user);
    res.status(200).send('DELETED');
}



module.exports = v2;