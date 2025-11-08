FROM node:lts as builder

WORKDIR /app

COPY . .

RUN npm install 
RUN npm run build 

EXPOSE 3000

CMD [ "npx", "nuxt", "start", "--hostname", "0.0.0.0" ]
