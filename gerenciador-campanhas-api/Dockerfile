# Use a imagem oficial do Node.js como a imagem base
FROM node:18-alpine
 
# Define o diretório de trabalho no contêiner
WORKDIR /app
 
# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./
 
# Instala as dependências do projeto
RUN npm install
 
# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Run tests
RUN npm run test
 
# Compila o código TypeScript para JavaScript
RUN npm run build
 
# Expõe a porta na qual a aplicação irá rodar
EXPOSE 5000
 
# Define o comando padrão para rodar a aplicação
CMD ["npm", "run", "start:prod"]