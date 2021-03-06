/**
 * CLI Input
 * Format: node crawl.js http://www.example.com
 */
const args = process.argv;

/**
 * Dependencies
 */
const jsdom = require("jsdom");

/**
 * App Components
 */
const Crawl = require('./src/Crawl.js');
const Input = require('./src/Input.js');
const Output = require('./src/Output.js');

/**
 * Handle Input & Initiate Crawl
 */
let cliInput = new Input(args);
let httpMod = cliInput.cleanArgs[0].startsWith('https') ? require('https') : require('http');

let siteCrawl = new Crawl(cliInput.cleanArgs, httpMod, Input, Output, jsdom);

siteCrawl.init();