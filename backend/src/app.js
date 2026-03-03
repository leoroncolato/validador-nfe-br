import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import validateRoutes from './routes/validate.js';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limitando arquivo a 
export const buildApp = () => {
    const app = Fastify({
        logger: true,
        bodyLimit: MAX_FILE_SIZE,
        connectionTimeout: 10000 //10 segundos de timeout para evitar DoS com arquivos grandes
    });
    //Plugin Multipart
    app.register(multipart, {
        limits: {
            fileSize: MAX_FILE_SIZE,
            files: 1,
        },
    });
    //Conversor de XML para string
    app.addContentTypeParser(['application/xml', 'text/xml'], { parseAs: 'string' }, (req, body, done) => {
        done(null, body);
    });
    //Registrar as rotas de validação
    app.register(validateRoutes);
    return app;
};
//# sourceMappingURL=app.js.map