const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

var User = mongoose.model("user", schema);

exports.registeruser = (name, email, password) => {
  return new Promise((resolve, rejects) => {
    mongoose
      .connect("mongodb://localhost:27017/books")
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          rejects("email is used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hpwd) => {
        let user = new User({
          name: name,
          email: email,
          password: hpwd,
        });
        return user.save();
      })
      .then((user) => {
        mongoose.disconnect();
        resolve("registered !!");
      })
      .catch((err) => {
        mongoose.disconnect();
        rejects("erreur!");
      });
  });
};

exports.loginUser = (email, password) => {
  return new Promise((resolve, rejects) => {
    mongoose
      .connect("mongodb://localhost:27017/books")
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((verif) => {
            if (verif) {
              mongoose.disconnect();
              resolve(user._id);
            } else {
              mongoose.disconnect();
              rejects("invalid password");
            }
          });
        } else {
          mongoose.disconnect();
          rejects("we dont have this user");
        }
      })
      .catch(() => rejects(err));
  });
};
