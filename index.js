const portfolio = require('./src/main/portfolio');
const cryptoConnection = require('./src/main/crypto.api');

const filePath = __dirname + '/data/transactions.csv';
const CURRENCY = 'USD';

const pf = new portfolio(filePath);

pf.create().then(async (portfolio) => {
    const tokens = Object.keys(portfolio);
    const cryptoConn = new cryptoConnection();
    const promises = [];
    for (const token of tokens) {
        promises.push(cryptoConn.get(token, CURRENCY).then((data) => {
            const rate = data[CURRENCY];
            const amount = portfolio[token];
            const value = parseFloat((portfolio[token] * rate).toFixed(2));
            portfolio[token] = { amount, value, rate }
        }));
    }
    return new Promise((resolve) => {
        return Promise.all(promises).then(() => resolve(portfolio));
    })

}).then((updatePfUsd) => {
    console.log(`Token values in ${CURRENCY} -> `, updatePfUsd);
}).catch((err) => console.error(err));


