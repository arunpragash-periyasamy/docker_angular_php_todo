FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm i -g @angular/cli

COPY . .

RUN  npm run build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.d

COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html

EXPOSE 80

