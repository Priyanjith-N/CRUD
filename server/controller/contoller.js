const Userdb = require("../model/model"); // import model.js

// admin page
exports.addUser = (req, res) => {
  newUser = new Userdb({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then((data) => {
      res.status(200).send("/adminHome");
    })
    .catch((err) => {
      req.session.email = req.body.email;
      req.session.emailNotUnique = true;
      res.status(400).send("/addUser");
    });
};

exports.findUser = (req, res) => {
  // To find specific data documents
  if (req.query.id) {
    Userdb.findOne({ _id: req.query.id })
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        } else {
          res.status(400).send("Not found");
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    return;
  }
  //To find all data documents
  Userdb.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(200).send("no user found");
    });
};

exports.updateUser = (req, res) => {
  Userdb.updateOne({ _id: req.params.id }, req.body)
    .then((data) => {
      if (data) {
        res.status(200).send("Data updated successfully");
      } else {
        res.status(400).send("User not found to update");
      }
    })
    .catch((err) => {
      res.status(500).send("Email already in use");
    });
};

exports.deleteUser = (req, res) => {
  Userdb.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send("data removed");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.isUser = (req, res) => {
  Userdb.findOne({ email: req.body.email, password: req.body.password })
    .then((data) => {
      if (data) {
        req.session.isUser = true;
        req.session.userName = data.name;
        res.redirect("/");
      } else {
        req.session.isValidate = true;
        res.status(400).redirect("/login");
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

exports.newUser = (req, res) => {
  newUser = new Userdb(req.body);
  if (newUser.email === "admin@gmail.com") {
    req.session.emailNotUnique = true;
    res.redirect("/register");
    return;
  }
  newUser
    .save()
    .then((data) => {
      res.redirect("/login");
    })
    .catch((err) => {
      req.session.emailNotUnique = true;
      res.redirect("/register");
    });
};
