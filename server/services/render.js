const axios = require('axios');

const adminEmail = 'admin@gmail.com';
const adminPassword = '123';

exports.adminLogin = (req, res) => {
    req.session.emailNotUnique = false;
    req.session.isValidate = false;
    res.render('adminLogin', { isValidate: req.session.isAdmin });
}

exports.adminHome = (req, res) => {
    req.session.emailNotUnique = false;
    axios.get(`http://localhost:${process.env.PORT}/api/findUser`)
    .then(userData => {
        res.render('adminIndex', { users: userData.data });
    })
    .catch(err => {
        res.status(500).send(err);
    });
};

exports.addUser = (req, res) => {
    res.render('addUser', { emailNotUnique: req.session.emailNotUnique, email: req.session.email });
};

exports.updateUser = (req, res) => {
    axios.get(`http://localhost:${process.env.PORT}/api/findUser?id=${req.query.id}`)
    .then(userData => {
        res.render('update_user', { user: userData.data });
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
}

exports.adminCheck = (req, res) => {
    if(adminEmail === req.body.email && adminPassword === req.body.password){
        req.session.isAuth = true;
        res.redirect('/adminHome');
    }else{
        req.session.isAdmin = true;
        res.redirect('/adminLogin');
    }
}

exports.adminLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/adminLogin');
}

exports.login = (req, res) => {
    req.session.emailNotUnique = false;
    req.session.isAdmin = false;
    res.render('login',{ isValidate: req.session.isValidate });
}

exports.home = (req, res) => {
    req.session.isValidate = false;
    res.render('home',{ username: req.session.userName });
}

exports.logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

exports.register = (req, res) => {
    req.session.isValidate = false;
    req.session.isAdmin = false;
    res.render('register', { emailIsValid: req.session.emailNotUnique });
}

exports.errorPage = (req, res) => {
    res.render('error')
}