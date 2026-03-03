import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { type NFe, type ItemNFe } from '../models/nf-e.js';


export class XmlParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'XmlParsingError';
  }
}

export const parseNFeXML = (xmlData: string | Buffer): NFe => {
  const xmlString = xmlData.toString('utf-8');

  // Validação estrutural do XML, onde o protege contra XML mal formado e recusa a requisição cedo, evitando processamento desnecessário
  const isValid = XMLValidator.validate(xmlString);
  if (isValid !== true) {
    throw new Error(`XML mal formatado: ${isValid.err.msg}`);
  }

  // Configurações focadas em segurança e normalização
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    parseTagValue: true,
    parseAttributeValue: true,
    // Força tags que podem repetir a serem sempre um array, evitando bugs de map/forEach
    isArray: (name) => {
      if (['det', 'ide'].includes(name)) return true;
      return false;
    }
  });

  const parsedObj = parser.parse(xmlString);

  //Navega ate o nó principal da NFe, que pode estar dentro de um envelope <nfeProc> ou diretamente como <NFe>, garantindo flexibilidade para diferentes formatos de XML de NFe
  const infNFe = parsedObj?.nfeProc?.NFe?.infNFe || parsedObj?.NFe?.infNFe || parsedObj?.infNFe;

  if (!infNFe) {
    throw new Error('Não foi possível encontrar a tag raiz da NF-e (infNFe) no XML.');
  }


  //Mapeamento para o modelo do TS, garantindo que 'det' sempre seja um array, mesmo que haja apenas um item, prevenindo crashes em validações posteriores que esperam um array
  let detRaw = infNFe.det || [];
  if(!Array.isArray(detRaw)){
    detRaw = [detRaw];
  }

  const detMapped: ItemNFe[] = detRaw.map((item: any) => ({
    cProd: item.prod?.cProd,
    vProd: item.prod?.vProd,
    qCom: item.prod?.qCom
  }));

  //extração do CFOP (na NF-e reak eke fica dentro de det.prod.CFOP, mas em outros formatos pode estar em ide.CFOP, então garantimos que seja sempre um array para facilitar o acesso)
  const ideRaw = infNFe.ide ? [infNFe.ide] : [];

  //normalizando os nó totais, garantindo que mesmo que haja apenas um total, ele seja tratado como um objeto consistente
  const totalRaw = infNFe.total?.ICMSTot || infNFe.total || {};

  // Mapeamento XML -> TypeScript (Garante que undefined vire array vazio para prevenir crash nos validadores)
  const nfe: NFe = {
    emit: {
      CNPJ: infNFe.emit?.CNPJ,
      xNome: infNFe.emit?.xNome,
    },
    det: detMapped,
    total: {
      vProd: totalRaw.vProd,
      vNF: totalRaw.vNF
    },
    ide: ideRaw.map((ideItem: any) => ({ CFOP: ideItem.CFOP }))
  };

  return nfe;
};