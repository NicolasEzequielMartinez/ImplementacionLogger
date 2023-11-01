import passport from 'passport';
import { Strategy as GitHubStrategy} from 'passport-github2';
import config from "../config.js";

import SessionController from '../controllers/sessionController.js';
import CartController from '../controllers/cartController.js';

const userController = new SessionController();
const cartController = new CartController();

export const initializePassportGitHub = () => {

    passport.use('github', new GitHubStrategy({
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {

        try {
            const responseControllerU = await userController.getUserByEmailOrNameOrIdController(profile._json.name);
            const exist = responseControllerU.result;
            if (exist) {
                return done(null, exist);
            } 
            if(!exist) {
                const responseControllerC = await cartController.createCartController();
                const cart = responseControllerC.result;
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "X",
                    email: "X",
                    age: 0,
                    password: "Sin contraseña.",
                    role: "user",
                    cart: cart._id,
                };
                const responseControllerU = await userController.createUserControler(newUser);
                const user = responseControllerU.result;
                return done(null, user);
            };
        } catch (error) {
            return done(error);
        }
    }));

};