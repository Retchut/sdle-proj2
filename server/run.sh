echo \
"\
FROM node:18-alpine3.15
WORKDIR /app/gun
COPY index.js package.json package-lock.json ./
RUN npm install
ENV PORT = $1
EXPOSE $1
CMD [ \"npm\", \"start\", \"$1\", \"$2\" ]" > Dockerfile

docker compose up --build