const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secreto'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));