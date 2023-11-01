import jwt from 'jsonwebtoken';
import config from "../config.js";

import UserController from '../controllers/sessionController.js';

const userController = new UserController();

export const completeProfile = async (req, res) => {
    const userId = req.signedCookies.envCoderUserIDCookie;
    console.log('Valor de la cookie userId:', userId);
    const last_name = req.body.last_name;
    const email = req.body.email;
    const age = req.body.age;
    const password = req.body.password;
    try {
        const updateUser = {
            last_name,
            email,
            age,
            password,
        };
        const responseControllerU = await userController.updateUserController(userId, updateUser);
        const userCompleteDB = responseControllerU.result;
        let token = jwt.sign({
            email: userCompleteDB.email,
            first_name: userCompleteDB.first_name,
            tickets: userCompleteDB.tickets,
            role: userCompleteDB.role,
            cart: userCompleteDB.cart,
            userID: userCompleteDB._id
        }, envCoderSecret, {
            expiresIn: '7d'
        });
        res.cookie(envCoderCookie, token, { 
            httpOnly: true, signed:true, maxAge: 10* 60 *1000
        })
        res.send({
            status: 'success',
            redirectTo: '/products'
        });
    } catch (error) {
        console.error('Error al completar el perfil:', error);
        res.status(500).json({
            message: 'Error al completar el perfil. Inténtalo de nuevo.'
        });
    }
};