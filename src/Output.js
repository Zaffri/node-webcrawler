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
    static saveToCsv(crawl, filename, hostUrl) {
        CSV.save(crawl, filename, defaultDir, hostUrl);
    }
}

module.exports = Output;