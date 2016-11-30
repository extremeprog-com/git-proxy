FROM ubuntu:16.04

ENV PORT=80

RUN apt-get update
RUN apt-get install -y --force-yes nodejs nodejs-legacy npm git openssh-client

RUN mkdir -p /root/rancher-github-proxy
COPY package.json /root/rancher-github-proxy/package.json

WORKDIR /root/rancher-github-proxy
RUN bash -c 'npm update || echo'
COPY . /root/rancher-github-proxy

CMD node server.js