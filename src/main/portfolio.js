const csvReader = require('../services/csv-reader');

const portfolio = function (csvFilePath) {
    this.filePath = csvFilePath;
    this.reader = new csvReader(this.filePath);
}

portfolio.prototype.create = function () {
    const FIELD_SEPARATOR = ',';
    const DEPOSIT = 'DEPOSIT';
    const WITHDRAW = 'WITHDRAWAL';
    return new Promise((resolve, reject) => {
        const rl = this.reader.get();
        const map = {};
        rl.on('line', (line) => {
            const splittedArray = line.split(FIELD_SEPARATOR);
            const transType = splittedArray[1];
            const tokenName = splittedArray[2];
            const amount = parseFloat(splittedArray[3]);
            if (!isNaN(amount)) {
                if (!map[tokenName]) {
                    // deposit
                    map[tokenName] = amount;
                } else {
                    if (transType == DEPOSIT) {
                        map[tokenName] = map[tokenName] + amount;
                    }
                    if (transType == WITHDRAW) {
                        map[tokenName] = map[tokenName] - amount;
                    }
                }
            }
        }).on('close', () => {
            resolve(map);
        }).on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = portfolio;