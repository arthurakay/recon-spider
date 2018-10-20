const Wappalyzer = require('wappalyzer');
const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const WAPPALYZER = new ArrayItemCache();

function analyzeWebsite(url, maxDepth = 2) {
    const options = {
        debug: false,
        delay: 500,
        maxDepth: maxDepth,
        maxUrls: 100,
        maxWait: 5000,
        recursive: true,
        htmlMaxCols: 2000,
        htmlMaxRows: 2000,
    };

    const wappalyzer = new Wappalyzer(url, options);


    wappalyzer.analyze()
        .then(json => {
            for (let i=0; i<json.applications.length; i++) {
                const app = json.applications[i];

                WAPPALYZER.merge({
                    [app.name]: app.version
                }, url);
            }

            sendMsg('wappalyzer', JSON.stringify(
                WAPPALYZER.serialize()
            ));
        });

}

/**
 *
 * @param domain
 * @param maxDepth
 */
function init(domain, maxDepth) {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('wappalyzer', JSON.stringify(WAPPALYZER.serialize()));
    });

    analyzeWebsite(domain, maxDepth);
}

module.exports = {
    init
};

/* EXAMPLE OUTPUT FROM WAPPALYZER
{
  "urls": {
    "https://www.ironnetcyber.com/": {
      "status": 200
    },
  },
  "applications": [
    {
      "name": "Bootstrap",
      "confidence": "100",
      "version": "3.3.7",
      "icon": "Bootstrap.png",
      "website": "https://getbootstrap.com",
      "categories": [
        {
          "18": "Web Frameworks"
        }
      ]
    },
    {
      "name": "Font Awesome",
      "confidence": "100",
      "version": null,
      "icon": "Font Awesome.png",
      "website": "http://fontawesome.io",
      "categories": [
        {
          "17": "Font Scripts"
        }
      ]
    }
  ],
  "meta": {
    "language": "en"
  }
}
 */