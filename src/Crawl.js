const Parse = require('./Parse.js');

/**
 * @description crawl specifics
 */
class Crawl extends Parse {

    /**
     * @description set site url and inject dependencies; Http/s & Input
     * @param {String} url 
     * @param {Http/Https} httpMod
     * @param {Input} Input
     * @param {jsdom} jsdom
     */
    constructor(url, httpMod, Input, jsdom) {
        super();

        // Dependencies
        this.httpMod = httpMod;
        this.jsdom = jsdom;
        this.Input = Input;

        // Crawl properties
        this.url = this.getHostUrl(url);
        this.pages = [{ "crawled": false, "path": "", "links": [] }]; // currently not using links, remove?
        this.currentPage = 0;
        this.complete = false;
    }

    /**
     * @description begin site crawl
     */
    async init() {
        console.log(this.url);

        while(this.complete == false) {

            let page = this.pages[this.currentPage];

            // Current page not crawled
            if(page.crawled == false) {

                console.log('Crawling page('+ (this.currentPage+1) +') : '+page.path);

                // Call sendRequest and handle promise
                await this.sendRequest(page.path, this.currentPage)
                    .then((html) => {

                        // If page reachable
                        if(page.statusCode == 200) {
                            // Get all anchor links & setup new pages
                            let dom = this.setupDom(html);
                            let links = this.getPageLinks(dom);
                            this.addNewPages(links);
                        }
                        
                        // Increment page & check current page is at index end
                        this.currentPage++;
                        page.crawled = true;

                        if(this.currentPage >= (this.pages.length - 1)) {
                            this.complete = true;
                        }

                    })
                    .catch((err) => {
                        console.error(err);
                    }); 

                    await this.requestDelay(1000);
            }

            // Set to true for testing purposes atm - 1 iteration
            // if(this.pages.length > 1) {
            //     this.complete = true;
            // }
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

                // Add to body arr
                const bodyArr = [];
                response.on('data', (chunk) => {
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

    /**
     * @description add array of urls to this.pages 
     * @param {Array} urls 
     */
    addNewPages(urls) {

        // 'added' for testing
        let added = 0;

        // Iterate through all urls
        for(let x=0; x<urls.length; x++) {

            // Check if url exists
            if(this.pageExists(urls[x]) == false) {

                // Only add if internal link
                if(this.urlIsInternal(urls[x])) {

                    // 'added' for testing
                    added++;
                    
                    // Get path
                    let path = (urls[x].startsWith('/')) ? urls[x] : this.getUrlPath(urls[x]);
                    //console.log(urls[x]);

                    // Add to page ... 
                    this.pages.push({
                        "crawled": false, 
                        "path": path, 
                        "links": [] // currently not using links, remove?
                    });
                }
            }
        }
        //console.log("total len = "+urls.length);
        //console.log("added (duplicates & externals removed) = "+added+" ("+ (urls.length-added) +")");
    }

    /**
     * @description 
     * @param {String} url 
     */
    pageExists(url) {

        // Get path "/link" and full url "www.host.com/link"
        let fullUrl, pathUrl, exists = false;
        
        if(url.startsWith('/')) {
            fullUrl = this.url + url;
            pathUrl = url;
        }   else {
            fullUrl = url;
            pathUrl = this.getUrlPath(url);
        }

        // Loop through pages
        for(let x=0; x<this.pages.length; x++) {

            let currentPageUrl = this.pages[x].path;

            // Use specific url to check - path or full
            if(currentPageUrl.startsWith('/')) {
                // Check for match
                if(currentPageUrl == pathUrl) {
                    exists = true;
                    break;
                }
            }   else {
                // Check for match
                if(currentPageUrl == fullUrl) {
                    exists = true;
                    break;
                }
            }
        }
        return exists;
    }

    /**
     * @description get path of URL
     * @param {String} url 
     */
    getUrlPath(url) {
        return url.slice(this.url.length);
    }

    /**
     * @description check if url is internal or external
     * @param {String} url
     */
    urlIsInternal(url) {
        
        // Check if full url or path
        if(url.startsWith('/')) {
            return true;
        }

        // Slice any trailing paths
        let len = this.url.length;
        let comparison = url.slice(0, len); 

        if(comparison == this.url) {
            return true;
        }

        return false;
    }

    /**
     * @description delay to limit requests per x
     * @param {Number} delay 
     */
    requestDelay(delay) {
        console.log('waiting ... '+delay+' ms');
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

module.exports = Crawl;