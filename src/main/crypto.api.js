const http = require('../services/http');

const cryptoAPI = function () {
    this.baseUrl = 'https://min-api.cryptocompare.com';
    this.connection = new http(this.baseUrl);
}

cryptoAPI.prototype.get = function (tokenName, currency) {
    const url = `data/price?fsym=${tokenName}&tsyms=${currency}`;
    return this.connection.get(url).then((res) => res.data);
}

module.exports = cryptoAPI;