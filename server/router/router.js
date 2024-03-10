const express = require('express');
const route = express.Router();

const services = require('../services/render'); // import render.js
const controller = require('../controller/contoller'); // import controller.js

//custom middleware for Admin Panel

const isAuthenticated = (req, res, next) => {
    if(req.session.isAuth){
        next();
    }else{
        res.redirect('/adminLogin');
    }
}

const isNotAuthenticated = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect('/adminHome');
    }else{
        next();
    }
}

//end of custom middleware for Admin Panel

//custom middleware for User

const isUserAuth = (req, res, next) => {
    if(req.session.isUser){
        next();
    }else{
        res.redirect('/login');
    }
}

const isNotUserAuth = (req, res, next) => {
    if(req.session.isUser){
        res.redirect('/');
    }else{
        next();
    }
}

//end of custom middleware for user


// get admin Panel

route.get('/adminLogin', isNotAuthenticated, isNotUserAuth, services.adminLogin);

route.get('/adminHome', isAuthenticated, services.adminHome);

route.get('/addUser', isAuthenticated, services.addUser);

route.get('/updateUser', isAuthenticated, services.updateUser);

//end of get admin Panel

//post Admin Panel

route.post('/adminlogin', services.adminCheck);

route.post('/adminLogout', services.adminLogout);

//end of post Admin Panel

// get user

route.get('/login', isNotUserAuth, isNotAuthenticated, services.login);

route.get('/', isUserAuth, services.home);

route.get('/register', isNotUserAuth, isNotAuthenticated, services.register);

//end of get user

// post user

route.post('/logOut', services.logOut);

//end of post user

// API
route.post('/api/addUser', controller.addUser); // admin add user api

route.get('/api/findUser', controller.findUser); // admin find user api

route.put('/api/updateUser/:id', controller.updateUser); // admin update user api

route.delete('/api/deleteUser/:id', controller.deleteUser); // admin delete user api

route.post('/api/login', controller.isUser);

route.post('/api/register', controller.newUser);

route.get('*', services.errorPage);

module.exports = route;