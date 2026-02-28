import Fastify, { type FastifyRequest, type FastifyReply } from 'fastify';

export const validarRequest = async (request: FastifyRequest, reply: FastifyReply) => { 
    const contentType = request.headers['content-type'] || '';
    let xmlString: string | undefined;
    
    //extrai o XML do corpo da requisição se for multipart
    if (contentType.includes('multipart/form-data')) {
        const data = await request.file();
        if (!data) return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
        const buffer = await data.toBuffer();
        xmlString = buffer.toString('utf-8'); //padrão trabalhado em arquivos de texto 
    }

    //extrai o XML do corpo da requisição se for XML puro
    else if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
        xmlString = request.body as string;
    }

    //extrai o XML do corpo se for JSON
    else if (contentType.includes('application/json')) {
        const data = request.body as { xml: string };
        xmlString = data.xml;
    }

    //se nao receber nada retorna erro
    else if (!xmlString) {
        return reply.status(415).send({ error: 'Nenhum arquivo com formato correto recebido' });
    }

    //Validação do XML
    if (xmlString || xmlString.trim() !== '') {
        return reply.status(400).send({ message: 'XML vazio ou ausente de tags e conteudo' });
    }
    

    //se tudo der certo vem para essa linha kkkkkkkkkkk
    return reply.status(200).send({ message: 'XML recebido e validado com sucesso', size: xmlString.length });

 }