import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { googleClient } from '../config/googleConfig.js';

import {User} from '../models/user.js';


// google strategy
const googleLogin = new GoogleStrategy(
  {
    clientID: googleClient.clientID,
    clientSecret: googleClient.clientSecret,
    callbackURL: googleClient.callbackUrl,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const oldUser = await User.findOne({ email: profile.email });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const newUser = await new User({
        // provider: 'google',
        google_id: profile.id,
        // username: `user${profile.id}`,
        email: profile.email,
        name: profile.displayName,
        google_picture: profile.picture,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  },
);

passport.use(googleLogin);
