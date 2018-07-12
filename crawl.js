const args = process.argv;
const file = args[1];

let Input = require('./src/input.js');

// New instance of Input class
let cliInput = new Input(args);