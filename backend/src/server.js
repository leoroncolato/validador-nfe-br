import { buildApp } from './app.js';
const start = async () => {
    const app = buildApp();
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server rodando em http://localhost:3000');
    }
    catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map