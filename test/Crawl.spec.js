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
        let testUrlPath = 'https://test.com/path1';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        crawlTest.rawUrl = testUrl;
        let result = crawlTest.getUrlPath(testUrlPath);

        expect(result).to.equal('path1');
    });

    /**
     * urlIsInternal test - check URL is internal.
     */
    it('Should return true - is internal URL (path only) ', () => {
        
        let testUrl = 'https://test.com';
        let testUrlPath = '/path1';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        let result = crawlTest.urlIsInternal(testUrlPath);

        expect(result).to.equal(true);
    });

    /**
     * urlIsInternal test 2 - check URL is internal.
     */
    it('Should return true - is internal URL (full URL) ', () => {
        
        let testUrl = 'https://test.com';
        let testUrlPath = 'https://test.com/path4';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        crawlTest.rawUrl = testUrl;
        let result = crawlTest.urlIsInternal(testUrlPath);

        expect(result).to.equal(true);
    });

    /**
     * urlIsInternal test 2 - check URL is internal.
     */
    it('Should return false - is external URL (full URL) ', () => {
        
        let testUrl = 'https://test.com';
        let testUrlPath = 'https://google.co.uk/path4';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        crawlTest.rawUrl = testUrl;
        let result = crawlTest.urlIsInternal(testUrlPath);

        expect(result).to.equal(false);
    });

    /**
     * removeUrlFragment test 1 
     */
    it('Should return \'testpath\'', () => {
        
        let testUrl = 'https://test.com';
        let testUrlPath = 'testpath#id';
        let match = 'testpath';

        let crawlTest = new Crawl(testUrl, {}, Input, {});
        crawlTest.rawUrl = testUrl;
        let result = crawlTest.removeUrlFragment(testUrlPath);

        expect(result).to.equal(match);
    });

});