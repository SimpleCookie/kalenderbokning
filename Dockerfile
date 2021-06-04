FROM node:16.3.0
WORKDIR /chocolate
COPY package.json /chocolate/package.json
#RUN npm set registry https://repo.intern.bolagsverket.se/repository/npm-public/
RUN cd /chocolate && yarn
