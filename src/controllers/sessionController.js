import SessionService from "../services/session.service.js";

export default class SessionController {
    constructor() {
        this.sessionService = new SessionService();
    }
    // Métodos User Controller: 
    async createUserControler(req, res, info) {
        let response = {};
        try {
            const resultService = await this.sessionService.createUserService(info);
            response.statusCode = resultService.statusCode;
            response.message = resultService.message;
            if (resultService.statusCode === 500) {
                req.logger.error(response.message);
            } else if (resultService.statusCode === 200) {
                response.result = resultService.result;
                req.logger.debug(response.message);
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al registrar al usuario - Controller: " + error.message;
            req.logger.error(response.message);
        };
        return response;
    };

    async getUserByEmailOrNameOrIdController( req, res, identifier) {
        let response = {};
        try {
            const resultService = await this.sessionService.getUserByEmailOrNameOrIdService(identifier);
            response.statusCode = resultService.statusCode;
            response.message = resultService.message;
            if (resultService.statusCode === 500) {
                req.logger.error(response.message);
            } else if (resultService.statusCode === 404) {
                req.logger.warn(response.message);
            } else if (resultService.statusCode === 200) {
                response.result = resultService.result;
                req.logger.debug(response.message);
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al obtener el usuario - Controller: " + error.message;
            req.logger.error(response.message);
        };
        return response;
    };

    async updateUserController( req, res, uid, updatedUser) {
        let response = {};
        try {
            const resultService = await this.sessionService.updateUserProfileSevice(uid, updatedUser);
            response.statusCode = resultService.statusCode;
            response.message = resultService.message;
            if (resultService.statusCode === 500) {
                req.logger.error(response.message);
            } else if (resultService.statusCode === 404) {
                req.logger.warn(response.message);
            } else if (resultService.statusCode === 200) {
                response.result = resultService.result;
                req.logger.debug(response.message);
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al actualizar los datos del usuario - Controller:" + error.message;
            req.logger.error(response.message);
        };
        return response;
    };

};