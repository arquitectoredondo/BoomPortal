FROM node:12.18 AS build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm rebuild node-sass
RUN npm run build${BUILD_TAG} --prod

# 2. Deploy html
FROM nginx:1.18-alpine
WORKDIR /app
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf