const Input = require('../src/Input.js');
const expect =  require('chai').expect;

describe('Input - handle arguments', () => {

    /**
     * No arguments example - get argument count
     */
    it('Should have no arguments (count 0)', () => {
        
        let testArgs = ['node', 'filename.js'];
        let testInput = new Input(testArgs);

        let rawArgs = testInput.cleanArgs.length;

        expect(rawArgs).to.equal(0);
    });

    /**
     * 1 argument example
     */
    it('Should have 1 arguments (count 1)', () => {
        
        let testArgs = ['node', 'filename.js', 'oneArg'];
        let testInput = new Input(testArgs);

        let rawArgs = testInput.cleanArgs.length;

        expect(rawArgs).to.equal(1);
    });

    /**
     * 2 argument example
     */
    it('Should have 2 arguments (count 2)', () => {
        
        let testArgs = ['node', 'filename.js', 'oneArg', 'twoArg'];
        let testInput = new Input(testArgs);

        let rawArgs = testInput.cleanArgs.length;

        expect(rawArgs).to.equal(2);
    });

    /**
     * 3 argument example
     */
    it('Should have 3 arguments (count 3)', () => {
        
        let testArgs = ['node', 'filename.js', 'oneArg', 'twoArg', 'threeArg'];
        let testInput = new Input(testArgs);

        let rawArgs = testInput.cleanArgs.length;

        expect(rawArgs).to.equal(3);
    });

    /**
     * Remove trailing slash test 1
     */
    it('Should match \'example.com\' (remove trailing slash)', () => {
        
        let testUrl = 'example.com/';
        let testUrlMatch = 'example.com';

        let test = Input.removeTrailingSlash(testUrl);

        expect(test).to.equal(testUrlMatch);
    });

    /**
     * Remove trailing slash test 2 - with no trailing slash
     */
    it('Should match \'example.com\' (no trailing slash)', () => {
        
        let testUrl = 'example.com';

        let test = Input.removeTrailingSlash(testUrl);

        expect(test).to.equal(testUrl);
    });

});