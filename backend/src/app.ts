import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import validateRoutes from './routes/validate.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const buildApp = () => {
    const app = Fastify({
        logger: true,
        bodyLimit: MAX_FILE_SIZE,
    });

    //Plugin Multipart
    app.register(multipart, {
        limits: {
            fileSize: MAX_FILE_SIZE,
            files: 1,
        },
    });

    //Conversor de XML para string
    app.addContentTypeParser(
        ['application/xml', 'text/xml'],
        { parseAs: 'string' },
        (req, body, done) => {
            done(null, body);
        }
    );

    //Registrar as rotas de validação
    app.register(validateRoutes);
    
    return app;
}