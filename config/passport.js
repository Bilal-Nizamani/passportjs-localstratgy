const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const { validPassword } = require("../lib/passwordUtils.js");
const User = connection.models.User;

const verifyCallBack = (username, password, done) => {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log("errererere");
      return done(err);
    }
    if (!user) {
      console.log("no user found");
      return done(null, false);
    }
    const isValid = validPassword(password, user.hash, user.salt);

    if (isValid) {
      console.log("user loged in password");
      return done(null, user);
    } else {
      console.log("user logined");
      return done(null, user);
    }
  });
};

const strategy = new LocalStrategy(
  {
    usernameField: "username", // Specify the username field
    passwordField: "password", // Specify the password field
  },
  verifyCallBack
);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
