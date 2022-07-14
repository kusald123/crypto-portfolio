const portfolio = require('./src/main/portfolio');
const cryptoConnection = require('./src/main/crypto.api');

const filePath = __dirname + '/data/transactions.csv';
const CURRENCY = 'USD';

const pf = new portfolio(filePath);

pf.create().then(async (portfolio) => {
    const tokens = Object.keys(portfolio);
    const cryptoConn = new cryptoConnection();
    for (const token of tokens) {
        try {
            const data = await cryptoConn.get(token, CURRENCY);
            const valueUSD = data[CURRENCY];
            portfolio[token] = portfolio[token] * valueUSD;
        } catch (err) {
            console.error(err);
        }
    }
    console.log(`Token values in ${CURRENCY} -> `, portfolio);
}).catch((err) => console.error(err));


