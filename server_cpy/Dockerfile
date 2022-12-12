FROM node:18-alpine3.15
WORKDIR /app/gun
COPY index.js package.json package-lock.json ./
RUN npm install
ENV PORT = 9000
EXPOSE 9000
CMD [ "npm", "start" ]