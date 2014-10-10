var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('passport.js line 11');
    new User({email: profile.emails[0].value})
      .fetch()
      .then(function(user) {
        console.log(user);
        if (!user) {
          var newUser = new User({
            first_name: profile.displayName.split(' ')[0],
            last_name: profile.displayName.split(' ')[1],
            email: profile.emails[0].value,
            role: 'user',
            provider: 'facebook',
          });
          newUser.save()
            .then(function(user) {
              console.log('got here');
              return done(undefined, user);
            })
            .catch(function(err) {
              return done(err);
            });
        }
      })
      .catch(function(err) {
        done(err);
      });
  }));
};