const fs = require('fs');
const rl = require('readline');

const csvReader = function (filePath) {
    this.filePath = filePath;
};

csvReader.prototype.get = function () {
    const readStream = fs.createReadStream(this.filePath);
    readStream.on('error', err => console.log(err));
    const rlIns = rl.createInterface({
        input: readStream,
        output: process.stdout,
        terminal: false
    });
    return rlIns;
}

module.exports = csvReader;