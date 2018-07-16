/**
 * @description JSDOM and anchor link searching methods.
 */
class Parse {

    /**
     * @description parse html so we can pull out required content.
     * @param {String} html 
     */
    setupDom(html) {
        let {JSDOM} = this.jsdom;
        return new JSDOM(html);
    }

    /**
     * @description returns tags according to passed query.
     * @param {String} query 
     * @param {JSDOM} dom
     */
    getTags(query, dom, all = true) {
        let tags;

        if(all) {
            tags = dom.window.document.querySelectorAll(query);
        }   else {
            tags = dom.window.document.querySelector(query);
        }
        return tags;
    }

    /**
     * @description returns page links as array
     * @param {JSDOM} dom 
     */
    getPageLinks(dom) {
        // Get anchor tags

        let tags = this.getTags("a", dom);
        let links = [];

        for(let x=0; x<tags.length; x++) {
            // Check if valid link
            if(this.isLink(tags[x].href)) {
                links.push(tags[x].href);
            }
        }
        return links;
    }

    /**
     * @description check if href value is real link.
     * @param {String} url 
     */
    isLink(url) {

        let nonUrls = ["javascript:void(0);", "javascript:void(0)", "#", ""];

        if(nonUrls.includes(url.trim().toLowerCase())) {
            return false;
        }
        return true;
    }
}

module.exports = Parse;