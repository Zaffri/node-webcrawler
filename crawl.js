const args = process.argv;

let Crawl = require('./src/Crawl.js');
let Input = require('./src/Input.js');

// New instance of Input class
let cliInput = new Input(args);
let siteCrawl = new Crawl(cliInput.cleanArgs[0]);

