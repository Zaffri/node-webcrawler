/**
 * @description Handle command line arguments (user input).
 */
class Input {

    /**
     * @param {Array} args 
     */
    constructor(args) {
        this.rawArgs = args;
        this.cleanArgs = Input.getCleanArgs(args);
    }

    /**
     * @description Set clean app arguments - remove first 2 ('node' & filename).
     * @param {Array} args 
     */
    static getCleanArgs(args) {
        let cleanArgs = args.slice(2);
        return cleanArgs;
    }
}

module.exports = Input;