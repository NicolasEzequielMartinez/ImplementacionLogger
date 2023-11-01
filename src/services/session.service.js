import SessionDAO from "../daos/mongodb/SessionMongo.dao.js";
export default class SessionService {
    constructor() {
        this.sessionDAO = new SessionDAO();
    }
    // Métodos UserService:
    async createUserService(info) {
        let response = {};
        try {
            const resultDAO = await this.sessionDAO.createUser(info);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 500;
                response.message = "Error  al registrar al usurio - Service: resultDao.result es null.";
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Usuario registrado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al registrar al usuario - Service: " + error.message;
        };
        return response;
    };

    async getUserByEmailOrNameOrIdService(identifier) {
        let response = {};
        try {
            const resultDAO = await this.sessionDAO.getUserByEmailOrNameOrId(identifier);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 404;
                response.message = `No se encontró ningún usuario con el Email, Nombre o ID, ${identifier}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Usuario obtenido exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al obtener el usuario - Service: " + error.message;
        };
        return response;
    };

    async updateUserProfileSevice(uid, updateUser) {
        let response = {};
        try {
            const resultDAO = await this.sessionDAO.updateUser(uid, updateUser);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 500;
                response.message = "Error al actualizar los datos del usuario - Service: resultDao.result es null.";
            } else if (resultDAO.result.matchedCount === 0) {
                response.statusCode = 404;
                response.message = `No se encontró ningún usuario con el ID ${uid}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Usuario actualizado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al actualizar los datos del usuario - Service: " + error.message;
        };
        return response;
    };

};