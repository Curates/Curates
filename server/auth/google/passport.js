var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      new User({email: profile.emails[0].value})
        .fetch()
        .then(function(user) {
          if (!user) {
            var newUser = new User({
              first_name: profile.displayName.split(' ')[0],
              last_name: profile.displayName.split(' ')[1],
              email: profile.emails[0].value,
              role: 'user',
              provider: 'google',
            });
            newUser.save()
              .then(function(user) {
                return done(null, user);
              })
              .catch(function(err) {
                return done(err);
              });
          }
          return done(null, user);
        })
        .catch(function(err) {
          done(err);
        });
    }
  ));
};
