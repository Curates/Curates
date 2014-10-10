var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

exports.setup = function (User, config) {
  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL
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
            role: 'twitter',
            provider: 'facebook',
          });
          newUser.save()
            .then(function(user) {
              return done(null, user);
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