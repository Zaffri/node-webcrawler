const Crawl = require('../src/Crawl.js');
const Input = require('../src/Input.js');
const expect =  require('chai').expect;

describe('Crawl actions', () => {

    /**
     * getHostUrl test - remove proceeding 'https' or 'http'.
     */
    it('Should return host url (without \'HTTP\')', () => {
        
        let testUrl = 'http://test.com';
        let testUrlMatch = 'test.com';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        let result = crawlTest.getHostUrl(testUrl);

        expect(result).to.equal(testUrlMatch);
    });

    /**
     * getHostUrl test - remove proceeding 'https' or 'http'.
     */
    it('Should return host url (without \'HTTPS\')', () => {
        
        let testUrl = 'https://test.com';
        let testUrlMatch = 'test.com';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        let result = crawlTest.getHostUrl(testUrl);

        expect(result).to.equal(testUrlMatch);
    });

    /**
     * getUrlPath test - return url path.
     */
    it('Should return url path', () => {
        
        let testUrl = 'https://test.com';
        let testUrlPath = 'test.com/path1';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        let result = crawlTest.getUrlPath(testUrlPath);

        expect(result).to.equal('/path1');
    });

});