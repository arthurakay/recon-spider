# spook.js

[![npm package](https://nodei.co/npm/spook.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/spook.js/)

*Licensed under the [GPLv3](https://github.com/arthurakay/spook.js/blob/master/LICENSE.md) because of GPL dependencies.*

## Build and Run Docker Container

If you just want to kick the tires, run the following:

    npm i
    npm run create-distro
    npm run docker-container

Then open your browser to `http://localhost:4000` and start kicking.

## Development

The client application (`/src/`) is built using `react`, `typescript` and `webpack`. Webpack HMR is enabled in 
development, so to fire things up run:

    npm i
    npm run start

The server is built using standard Node.js and `express` settings. If you make changes to any files under `/server/`, 
you'll need to start and restart the process above. 

To view the application, open your browser at `http://localhost:3000`.