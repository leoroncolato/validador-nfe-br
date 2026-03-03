# Validador de NF-e BR 🧾


Este projeto aborda o cenário regulatório complexo do ecossistema tributário brasileiro e o imperativo da automação tecnológica. O objetivo é substituir processos manuais descentralizados — que custam até 28 horas semanais de profissionais focados em conferência de documentos (para aqueles que ainda não sabem do poder e facilidade que esse tipo de ferramenta gera) — por um fluxo automatizado, resiliente e escalável.

## 🎯 O Desafio e a Solução

A dependência de processos manuais na conferência de Notas Fiscais Eletrônicas (NF-e) eleva a margem de erro e expõe corporações a vulnerabilidades severas. Para mitigar isso, esta aplicação recria um microcosmo dos gargalos corporativos, focando em:

* **Resiliência Estrutural:** Tratamento rigoroso e blindagem contra XMLs mal formatados. O parser foi customizado para lidar com tipagem estrita de metadados fiscais (ex: prevenção da supressão de zeros à esquerda em CNPJs e códigos EAN).
* **Lógica Algorítmica e Validação:** Implementação de regras de negócio avançadas, validação matemática de impostos e verificação de integridade de dígitos verificadores (CNPJ/CFOP).
* **Performance e Segurança:** Backend desenhado com Fastify, implementando limites rígidos de *multipart upload* (10MB) e controle de *timeout* para prevenção de ataques DoS.

## 🛠 Stack Tecnológica

O projeto foi estruturado em um ambiente ágil, utilizando a stack aderente aos modernos desafios de automação e mensageria assíncrona.

* **Linguagem Principal:** TypeScript (Front e Back)
* **Backend:** Node.js, Fastify, `@fastify/multipart`, `fast-xml-parser`
* **Frontend:** React, Vite, CSS Variables (Dark/Light mode automático)

## 🚀 Como Executar Localmente

A aplicação está dividida em duas camadas (`/frontend` e `/backend`). Em dois terminais distintos, execute:

**1. Backend (API - Porta 3000):**
```bash
cd backend
npm install
npm run dev
```

**2. Frontend (UI - Porta 5173):**

```bash
cd frontend
npm install
npm run dev
```

## 🧠 Decisões de Arquitetura em Destaque

Durante o desenvolvimento, algumas decisões arquiteturais foram tomadas para focar em "geração de valor" e "mitigação reativa de riscos fiscais":

1. **Parser de XML Determinístico:** A biblioteca de conversão de XML para JSON foi configurada para *não* inferir valores puramente numéricos como `Number` no JavaScript, garantindo a integridade de dados como Códigos de Município, CEPs e CNPJs que comumente iniciam com `0`.
2. **Normalização de Estruturas:** Como o XML da NF-e pode omitir arrays quando há apenas um item (ex: tag `<det>`), o parser aplica a normalização automática para `Array` no momento da conversão, prevenindo quebras de código em produção.
3. **Escopo Limpo no Controller:** Gerenciamento seguro de leitura de buffers temporários em uploads *multipart*, assegurando a limpeza correta do fluxo de memória após a conversão para string.

---

Desenvolvido por [Leonardo Roncolato](https://www.google.com/search?q=https://github.com/leoroncolato).