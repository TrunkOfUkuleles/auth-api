'use strict';

const User = require('../models/user.js');

module.exports = async (req,res,next) => {

    try{
        if(!req.headers.authorization) {next("Invalid Login")}
        let token = req.headers.authorization.split(' ').pop();
        let validation = await User.bearerAuth(token)
        req.user = validation
        req.token = validation.token
        next();

    }catch(e){
        res.status(403).send('Invalid Login')
    }

}