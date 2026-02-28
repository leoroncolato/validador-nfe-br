import type { FastifyInstance } from "fastify";
import { validarRequest } from "../controllers/validateController.js";

export default async function validateRoutes(app: FastifyInstance) {
    app.post('/validate', validarRequest);
}