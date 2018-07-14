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
        this.dom = new JSDOM(html);
    }

    /**
     * @description returns tags according to passed query.
     * @param {String} query 
     */
    getTag(query) {

    }

    /**
     * @description returns page links as array
     */
    getPageLinks() {
        // Get anchor tags
    }
}

module.exports = Parse;