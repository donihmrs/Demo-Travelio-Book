FROM node:14.17.3 as build
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080