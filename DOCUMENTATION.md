# Technical Documentation

This project utilizes a few key pieces of open source technology:

#### Client Application
* ReactJS
* MobX
* Socket.io
* Typescript / Webpack / Jest, other dev dependencies


#### Server Application
* Express
* Socket.io
* Wappalyzer
* RetireJS
* headless-chrome-crawler

#### Kali Linux commands
* nslookup

## Socket.io Events

Because many of the operations performed are asynchronous, Socket.io emits a variety of events to keep the client
application updated in real-time (it also helps to avoid HTTP request timeouts). These events are:
* _connection_: Whenever the client application connects to the server
* _crawler_: When the "crawl" API has completed its operation and closes
* _headers_: Whenever new HTTP response headers are detected and added to the cache
* _metaTags_: Whenever new HTML meta tags are detected and added to the cache
* _sitemap_: Whenever new URLs are crawled and added to the cache
* _wappalyzer_: When the Wappalyzer process has completed
* _nslookup_: When the `nslookup` script has completed 