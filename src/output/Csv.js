const fs = require('fs');

/**
 * @description Save to CSV file
 */
class Csv {

    /**
     * @description save as CSV format
     * @param {Crawl} crawl
     * @param {String} filename 
     * @param {String} defaultDir 
     */
    static save(crawl, filename, defaultDir) {
        
        fs.writeFile(defaultDir+"/"+filename+'.csv', "Tests", function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
    }
}

module.exports = Csv;