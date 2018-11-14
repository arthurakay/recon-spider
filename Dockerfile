FROM kalilinux/kali-linux-docker

RUN apt-get update -y && \
    apt-get dist-upgrade -y && \
    apt-get autoremove -y && \
    apt-get clean -y

RUN apt-get -y install curl gnupg

RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install nodejs -y

ENV NODE_ENV production

WORKDIR /root/app
COPY . .

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]