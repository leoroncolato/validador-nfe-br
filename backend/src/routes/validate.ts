import type { FastifyInstance } from "fastify";
import { validarNFe } from "../controllers/validateController.js";

export async function validateRoutes(app: FastifyInstance) {
    app.post('/validate', validarNFe);
}