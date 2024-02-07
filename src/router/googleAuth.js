import { Router } from 'express';
import passport from 'passport';
import { constants } from '../utils/constant.js';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);



router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = req.user.getJwtToken();
    res.cookie('token', token);
    res.redirect(constants.frontend_url);
  },
);

export {router};