import mongoose from "mongoose";
import { userModel } from './models/users.model.js'
import config from "../../config.js";

export default class UserDAO {

    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );

    async createUser(info) {
        let response = {}
        try {
            const result = await userModel.create(info);
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "Error al registrar al usurio - DAO: " + error.message;
        };
        return response;
    }

    async getUserByEmailOrNameOrId(identifier) {
        let response = {};
        try {
            const conditions = [{
                    email: identifier
                },
                {
                    first_name: identifier
                }
            ];
            if (mongoose.Types.ObjectId.isValid(identifier)) {
                conditions.push({
                    _id: identifier
                });
            }
            const result = await userModel.findOne({ $or: conditions });
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "Error al obtener el usuario - DAO. Error original: " + error.message;
        };
        return response;
    }

    async updateUser(uid, updateUser) {
        let response = {};
        try {
            let result = await userModel.updateOne({ _id: uid }, { $set: updateUser });
            let userUpdate = await userModel.findOne({
                _id: uid
            });
            response.status = "success";
            response.result = userUpdate;
        } catch (error) {
            response.status = "error";
            response.message = "Error al actualizar los datos del usuario - DAO: " + error.message;
        };
        return response;
    };
}