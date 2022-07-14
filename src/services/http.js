const axios = require('axios').default;

const httpConnection = function (baseUrl, headers = {}) {
    this.connection = axios.create({
        baseURL: baseUrl,
        headers: headers
    });
}

httpConnection.prototype.get = function (url, headers = {}) {
    return this.connection.get(url, {
        headers: headers
    });
};

module.exports = httpConnection;

