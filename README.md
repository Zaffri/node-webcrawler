# Webcrawler

Simple webcrawler built with NodeJS. It makes use of the built in NodeJS HTTP & HTTPS modules to send requests.

---

## Usage & Examples

1. Install dependencies.

```
npm install
```

2. Run ./crawl.js and pass a URL with a HTTP/S prefix.

*Example 1*

Most basic example.

```
node crawl.js https://www.example.com
```

*Example 2*

Pass optional name of CSV file to save to.

```
node crawl.js https://www.example.com filename
```

---

## Arguments

*[URL]* 

URL you wish to crawl.

*[Output file]* - *Optional*

The name of the file to save results to. Default value is 'result'.

---

## Development Backlog

* Add check for 'NPM run test' and manually hitting 'crawl.js'. 
* Add logic for checking JS links.
