const CSV = require('./output/Csv.js');
const defaultDir = 'output';

/**
 * @description Handles saving web crawl data
 */
class Output {

    /**
     * @description save as CSV format
     * @param {String} filename 
     */
    static saveToCsv(crawl, filename) {
        CSV.save(crawl, filename, defaultDir);
    }
}

module.exports = Output;