const { test } = require('node:test');
const assert = require('node:assert');
const { analyzeNetworkProcessor } = require('./analyzeNetwork');

// the example input and expected output from the guidelines
const input = [
    'Partner Chris',
    'Partner Molly',
    'Company Globex',
    'Company ACME',
    'Employee Laurie Globex',
    'Company Hooli',
    'Employee Abdi Hooli',
    'Employee Jamie Globex',
    'Contact Laurie Chris email',
    'Contact Laurie Molly call',
    'Partner Rezzan',
    'Contact Abdi Molly email',
    'Contact Laurie Chris coffee',
].join('\n');

test('reports the strongest partner per company', () => {
    const { report } = analyzeNetworkProcessor(input);

    assert.deepStrictEqual(report.split('\n'), [
        'ACME: No current relationship',
        'Globex: Chris (2)',
        'Hooli: Molly (1)',
    ]);
});
