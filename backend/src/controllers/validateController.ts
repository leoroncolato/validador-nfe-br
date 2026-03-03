import { type FastifyRequest, type FastifyReply } from 'fastify';
import { XmlParsingError, parseNFeXML } from '../services/conversorXml.js';
import { runValidations } from '../services/validadorNFe.js';
import { formatValidationResponse, formatParsingError } from '../utils/errorFormatter.js'

export const validarNFe = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        let xmlContent = '';

        //Verificação para saber se a request é do tipo multipart/form-data (upload de arquivo) ou application/json (XML em string)
        if (request.isMultipart()) {
            const data = await request.file();
            if(!data){
                return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
            }
    
            // Usando .toBuffer() para leitura, que é seguro com nosso limite estrito de 10MB
            const buffer = await data.toBuffer();
            xmlContent = buffer.toString('utf-8'); //formatação padrão de caracteres
        } else {
            //caso enviem o XML como raw text no <body> da requisição
            xmlContent = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
        }



        if (!xmlContent || xmlContent.trim() === '') {
            return reply.status(400).send({ formatParsingError: 'XML vazio ou sem conteúdo válido' });
        }

        //1º XML -> Objeto TypeScript
        const nfeParsed = parseNFeXML(xmlContent);

        //2º Objeto TypeScript -> Validações de regras de negócio
        const validacaoResultado = runValidations(nfeParsed);

        //3º Formatação da resposta de validação
        const response = formatValidationResponse(validacaoResultado);

        //4º Retorna 200 OK com o resultado da validação
        return reply.status(200).send(response);
        

    } catch (error: any) {
        //HTTP 400
        if (error instanceof XmlParsingError){
            request.log.error ({ requestId: request.id, error: error.message }, 'Erro de parsing XML');
            return reply.status(400).send({ formatParsingError: error.message });
        }
        
        //HTTP 500
        request.log.error({ requestId: request.id, error: error.message }, 'Erro interno na validação da NF-e');
        return reply.status(500).send({ 
            status: 'erro_interno',
            mensagem: 'Ocorreu um erro interno ao processar a NF-e. Por favor, tente novamente mais tarde.'
        });
    }
    
 }