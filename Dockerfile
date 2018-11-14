FROM kalilinux/kali-linux-docker

# be sure we have the lastest from Kali Linux
RUN apt-get update -y && \
    apt-get dist-upgrade -y && \
    apt-get autoremove -y && \
    apt-get clean -y

# install additional Kali Linux things (e.g. nslookup)
RUN apt-get -y install dnsutils kali-linux-web

# required to install Node
RUN apt-get -y install curl gnupg
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash - && apt-get install nodejs -y
RUN npm i -g npm

# install Chrome manually because HCC/Puppeteer have dependencies
RUN apt-get -y install gdebi
WORKDIR /root
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN gdebi --non-interactive google-chrome-stable_current_amd64.deb

# for added security, create a user/group so we don't run the container as root
RUN groupadd -r spookjs -g 1000 && useradd -r -u 1001 -g spookjs appuser

WORKDIR /home/appuser
COPY . .

ENV NODE_ENV production
RUN npm i

RUN chown appuser:spookjs -R /home/appuser
USER appuser

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]