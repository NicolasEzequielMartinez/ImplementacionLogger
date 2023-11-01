import mongoose from "mongoose";
import { messageModel } from "./models/messages.model.js"
import config from "../../config.js";

export default class MessageDAO {

    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );

    async createMessage(message) {
        let response = {};
        try {
            const result = await messageModel.create(message);
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "Error al crear el mensaje - DAO: " + error.message;
        };
        return response;
    };

    async getAllMessage() {
        let response = {};
        try {
            let result = await messageModel.find().lean();
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "Error al obtener los mensajes - DAO: " + error.message;
        };
        return response;
    };

    async deleteMessage(mid) {
        let response = {};
        try {
            let result = await messageModel.deleteOne({ _id: mid });
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "Error al eliminar el mensaje - DAO: " + error.message;
        };
        return response;
    };
}