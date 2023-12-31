import mongoose from "mongoose";
import { ticketModel } from './models/ticket.model.js'
import config from "../../config.js";

export default class TicketDAO {

    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );

    async createTicket(ticketInfo) {
        let response = {}
        console.log(ticketInfo)
        try {
            const result = await ticketModel.create(ticketInfo);
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo crear el ticket - DAO. Error original: " + error.message;
        };
        return response;
    };

    async getTicketByID(tid) {
        let response = {}
        try {
            const result = await ticketModel.findOne({
                _id: tid
            });
            response.status = "success";
            response.result = result;
        } catch (error) {
            response.status = "error";
            response.message = "Error al obtener el ticket por ID - DAO: " + error.message;
        };
        return response;
    };
}
