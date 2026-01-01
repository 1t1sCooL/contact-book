FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/share/nginx/html/contact-book
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html/contact-book/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]