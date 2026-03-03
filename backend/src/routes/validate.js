import { validarNFe } from "../controllers/validateController.js";
export default async function validateRoutes(app) {
    app.post('/validate', validarNFe);
}
//# sourceMappingURL=validate.js.map