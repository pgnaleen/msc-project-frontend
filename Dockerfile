FROM node:16-buster as build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli@12.2.0

RUN ng build

RUN ls /app/dist/fuse

FROM twalter/openshift-nginx

COPY --from=build-stage /app/dist/fuse /usr/share/nginx/html

EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]
