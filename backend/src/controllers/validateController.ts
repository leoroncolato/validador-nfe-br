import Fastify, { type FastifyRequest, type FastifyReply } from 'fastify';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const validarRequest = async (request: FastifyRequest, reply: FastifyReply) => { 
    const contentType = request.headers['content-type'] || '';
    let xmlString: string | undefined;
    
    try {
        const data = await request.file();

        if(!data){
            return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
        }

        // Usando .toBuffer() para leitura, que é seguro com nosso limite estrito de 10MB
        const fileBuffer = await data.toBuffer();
        const xmlContent = fileBuffer.toString('utf-8');

        // Validação do XML usando fast-xml-parser
        const validacaoResultado = XMLValidator.validate(xmlContent);
        if (validacaoResultado !== true) {
            return reply.status(400).send({ error: 'XML inválido', details: validacaoResultado });
        }

        //configurando XML-Parser
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
            parseTagValue: true,
            parseAttributeValue: true,
            trimValues: true
        });

        //cCaso o Xml seja JSOn
        const parsedJson = parser.parse(xmlContent);
        //verificação do cabeçalho do XML para garantir que seja um arquivo de NFe válido, verificando as tags principais
        if (!parsedJson.nfeProc && !parsedJson.NFe) {
            return reply.status(400).send({ error: 'XML vazio ou sem conteúdo válido' });
        }

        return reply.status(200).send({ message: 'XML recebido e validado com sucesso', size: xmlContent.length });
    } catch (error: any) {
        request.log.error('Erro ao processar o arquivo XML:', error);

        // Captura explícita do erro lançado se o arquivo exceder os 10MB (limite do multipart)
    if (error.code === 'FST_REQ_FILE_TOO_LARGE') {
        return reply.status(413).send({ error: 'O arquivo excede o tamanho máximo configurado de 10MB.' });
      }
  
      return reply.status(500).send({ error: 'Erro interno ao processar o arquivo XML.' });
    }
    
 }