'use strict';

const fs = require('fs');

const VALID_CONTACT_TYPES = ['email', 'call', 'coffee'];

const readInput = () => {
    const fileArg = process.argv[2];
    if (!fileArg) {
        console.error('no file provided! usage: node analyzeNetwork.js <input-file>');
        process.exit(1);
    }

    try {
        return fs.readFileSync(fileArg, 'utf8');
    } catch (err) {
        console.error(`error: cannot read "${fileArg}" - ${err.message}`);
        process.exit(1);
    }
};

/**
 * LLM: Claude optimized function
 * @param {*} company
 * @param {*} partners
 * @returns `${company}: ${best} (${bestStrength})`
 */
const formatCompanyLine = (company, partners) => {
    // [[partner, count], ...] - empty if no partner ever contacted this company
    const contacts = Object.entries(partners ?? {});

    // requirement: output: ${company}: No current relationship
    if (contacts.length === 0) {
        return `${company}: No current relationship`;
    }

    // strongest first, ties broken alphabetically so output is deterministic
    contacts.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const [best, bestStrength] = contacts[0];

    // requirement: output: ${company}: ${partner} (${count})
    return `${company}: ${best} (${bestStrength})`;
};

const analyzeNetworkProcessor = (input) => {
    // main processing logic
    const partners = [];
    const companies = [];
    const employeeToCompany = {};
    // strengthByCompany = { company: { partner: count } }
    const strengthByCompany = {};

    const inputLines = input.split('\n');
    inputLines.forEach((line, i) => {
        const inputText = line.trim().split(/\s+/);
        const [command, ...args] = inputText;

        switch (command) {
            case 'Partner':
                partners.push(args[0]);
                break;

            case 'Company':
                companies.push(args[0]);
                break;

            case 'Employee': {
                const [name, company] = args;
                employeeToCompany[name] = company;
                break;
            }

            case 'Contact': {
                const [employee, partner, type] = args;
                // requirement: only email, call, or coffee count; skip anything else
                if (!VALID_CONTACT_TYPES.includes(type)) break;
                if (!partners.includes(partner)) break;

                const company = employeeToCompany[employee];
                if (!strengthByCompany[company]) {
                    strengthByCompany[company] = {};
                }
                const companyPartners = strengthByCompany[company];
                companyPartners[partner] = (companyPartners[partner] ?? 0) + 1;
                break;
            }

            default:
                break;
        }
    });

    const report = [...companies]
        .sort((a, b) => a.localeCompare(b))
        .map((company) => formatCompanyLine(company, strengthByCompany[company]))
        .join('\n');

    return { report };
};

const analyzeNetwork = () => {
    // node -> analyzeNetwork.js -> readInput() -> analyzeNetworkProcessor() -> return report
    const { report } = analyzeNetworkProcessor(readInput());
    if (report) {
        console.log(report);
    }
};

// only run as a CLI: `require` from a test should not execute the program
if (require.main === module) {
    analyzeNetwork();
}

module.exports = { analyzeNetworkProcessor };
