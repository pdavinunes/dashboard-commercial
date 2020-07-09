# Dashboard Commercial :convenience_store:

Um simples painel de controle que pequenas empresas podem cadastras suas lojas e seus produtos.

## Pré-requisitos

* PostgreSQL
* Node.JS (12.x)
* NPM

## Como usar

Primeiro, é necessário pré-configurar o ambiente, com os seguintes comando em um terminal:

```bash
createdb dashboard # Cria o banco de dados localmente no Postgres
git clone <link.git> # Clona o atualmente repositório na maquina
cd backend/ # Entra na pasta do projeto backend
npm i # Instala todos os pacotes do package.json 
npm run knex:migrate # Cria as tabelas necessárias pro funcionamento da aplicação
npm start # Inicia o servidor backend
```
Pronto, agora seu servidor backend está executando [localmente](http://localhost:3333/api/docs), para iniciar o servidor futuramente, basta utilizar o comando: ```npm start``` dentro da pasta do projeto backend.

Para iniciar a sua interface web, use os seguintes comandos: 

```bash
# Entende-se que você está na pasta raiz do repositório
cd frontend/ # Entra na pasta do projeto frontend
npm i 
npm start # Inicia o servidor frontend
```

Pronto, agora sua aplicação frontend está executando [localmente](http://localhost:3000/), para iniciar a aplicação futuramente, basta utilizar o comando: ```npm start``` dentro da pasta do projeto frontend.

## Documentação

Toda a documentação da API REST está disponível na seguinte rota: 
[localhost:3333/api/docs](http://localhost:3333/api/docs)