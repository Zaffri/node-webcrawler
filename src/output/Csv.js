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
    static save(crawl, filename, defaultDir, hostUrl) {
        
        let output = Csv.getCsvHeader();

        // Loop through data and append items
        for(let x=0; x<crawl.length; x++) {
            
            let url =  (hostUrl.endsWith('/')) ? hostUrl+crawl[x].path : hostUrl+'/'+crawl[x].path; 
            let statusCode = crawl[x].statusCode;

            let newLine = url +', '+ statusCode +' \n';
            output += newLine;
        }

        // Write to file
        fs.writeFile(defaultDir+"/"+filename+'.csv', output, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("Crawl data saved to '" + filename + ".csv'");
        }); 
    }

    static getCsvHeader() {
        return 'URL, Status \n';
    }
}

module.exports = Csv;