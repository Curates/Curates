var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      new User({email: profile.emails[0].value})
        .fetch()
        .then(function(user) {
          if (!user) {
            var newUser = new User({
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.emails[0].value,
            role: 'user',
            provider: 'facebook',
            });
            newUser.save();
          }
        })
        .catch(function(err) {
          return done(err)
        });
      }
  ));
};