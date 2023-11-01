import { Router } from "express";
import passport from "passport";
import {completeProfile} from '../config/formExtra.js'

import { registerUser, loginUser, getCurrentUser, authenticateWithGitHub, getProfileUser} from './middlewares/passport.middleware.js';

const sessionRouter = Router();

// REGISTRO
sessionRouter.post('/register', registerUser);

//LOGIN
sessionRouter.post('/login', loginUser);

// CURRENT
sessionRouter.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

// GITHUB
sessionRouter.get('/github', passport.authenticate('github', { session: false, scope: 'user:email' }));
sessionRouter.get('/githubcallback', authenticateWithGitHub);

// FORMULARIO COMPLETO
sessionRouter.post('/completeProfile', completeProfile);

// PERFIL USUARIO
sessionRouter.get('/profile', passport.authenticate('jwt', { session: false }), getProfileUser)

export default sessionRouter;