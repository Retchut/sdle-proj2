FROM node:18-alpine3.15
WORKDIR /app/frontend
COPY src/ ./src
COPY public/ ./public
COPY .env package.json package-lock.json ./
RUN npm install
ENV PORT = 3000
EXPOSE 3000
CMD [ "npm", "start" ]