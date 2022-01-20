FROM node:14

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY . /app/

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/main.js" ]
