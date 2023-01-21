FROM ubuntu
WORKDIR /app
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y ffmpeg
RUN apt-get install -y nodejs
RUN apt-get install -y npm

COPY package.json /app
RUN npm install
RUN npm install -g nodemon
COPY . /app
CMD ["npm", "start"]


# FROM node:latest
# RUN apt-get update && apt-get upgrade -y
# WORKDIR /app
# COPY package.json /app
# RUN npm install -g npm@7.6.3

# sudo docker run -it -p 2020:2020 -v $(pwd):/app sociomee-docker-api
# sudo docker run -it -p 2020:2020 sociomee-docker-api
# sudo docker build -t sociomee-docker-api .