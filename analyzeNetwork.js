'use strict'

const fs = require('fs');

const readInput = () => {
    const fileArg = process.argv[2]
    if (fileArg) {
        try {
            return fs.readFileSync(fileArg, 'utf8');
        } catch (err) {
            console.error('error: ', err)
        }
    }
}

const analyzeNetworkProcessor = (input) => {
    // todo: main processing logic
    console.log(input)
    const report = input
    return report;
}

const analyzeNetwork = () => {
    // node -> analyzeNetwork -> readInput -> analyzeNetworkProcessor -> return report
    const { report } = analyzeNetworkProcessor(readInput())
    if (report) {
        console.log(report)
    }
};

analyzeNetwork();