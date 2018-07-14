/**
 * @description crawl specifics
 */
class Crawl {

    /**
     * @description set site url and inject dependencies; Http/s & Input
     * @param {String} url 
     * @param {Http/Https} httpMod
     * @param {Input} Input
     */
    constructor(url, httpMod, Input) {

        // Dependencies
        this.httpMod = httpMod;
        this.Input = Input;

        // Class properties
        this.url = this.getHostUrl(url);
        this.pages = [{ "crawled": false, "path": "", "links": [] }];
        this.currentPage = 0;
        this.complete = false;
    }

    /**
     * @description begin site crawl
     */
    init() {
        console.log(this.url);
        while(this.complete == false) {

            let page = this.pages[this.currentPage];

            // Current page not crawled
            if(page.crawled == false) {

                console.log('Crawling page: '+ (this.currentPage+1) );

                // Call sendRequest and handle promise
                this.sendRequest(page.path, this.currentPage)
                    .then((html) => {

                        // If page reachable
                        if(page.statusCode == 200) {
                            // Get all anchor links & setup new pages
                        }

                        console.log(html);
                        
                        // Increment page & check current page is at index end
                        this.currentPage++;

                        if(this.currentPage >= (this.pages.length - 1)) {
                            this.complete = true;
                        }

                    })
                    .catch((err) => {
                        console.error(err);
                    }); 

            }
            // Set to true for testing purposes atm - 1 iteration
            this.complete = true;
        }

    }

    /**
     * @description Send HTTP request using http/https dependency (this.httpMod)
     * @param {String} path 
     * @param {Number} currentPage 
     */
    sendRequest(path, currentPage) {
        return new Promise((resolve, reject) => {

            let request = this.httpMod.get({
                host: this.url,
                path: '/'+path

            }, (response) => {
                // Set response code
                this.pages[currentPage].statusCode = response.statusCode;
                console.log('Status: '+ response.statusCode);

                // Add to body arr
                const bodyArr = [];
                response.on('data', (chunk) => {
                    console.log('Adding chunk to body response.');
                    bodyArr.push(chunk);
                });

                // Handle completion
                response.on('end', () => 
                    // Send body as string
                    resolve(bodyArr.join(''))
                );
            });

            // Handle req error
            request.on('error', (err) => 
                reject(err)
            );
        });
    }

    /**
     * @description remove proceeding http or https e.g. 'https://'
     * @param {String} url 
     */
    getHostUrl(url) {
        url = this.Input.removeTrailingSlash(url);
        let cut = url.startsWith('https') ? 8 : 7;
        return url.slice(cut, url.length);
    }
}

module.exports = Crawl;