const args = process.argv;
const file = args[1];

let Input = require('./src/input.js');

// New instance of Input class
let cliInput = new Input(args);

console.log("Raw arguments: ");

for(x=0; x<args.length; x++) {
    console.log(x +": "+ args[x]);
}

console.log("Clean arguments: ");

for(x=0; x<cliInput.cleanArgs.length; x++) {
    console.log(x +": "+ cliInput.cleanArgs[x]);
}