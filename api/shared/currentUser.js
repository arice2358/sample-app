// @ts-check
class CurrentUser {
    /**
    * @param {string} header
    */

    constructor(header) {
        const encoded = Buffer.from(header, 'base64');
        const decoded = encoded.toString('ascii');
        this.json = JSON.parse(decoded);
    }

    async getCurrentUser() {
        return this.json.userId        
    }
}

module.exports = CurrentUser