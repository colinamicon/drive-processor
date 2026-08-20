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

/**
 * LLM: Claude optimized function
 * @param {*} company 
 * @param {*} partners 
 * @returns `${company}: ${best} (${bestStrength})`
 */
const formatCompanyLine = (company, partners) => {
    // [[partner, count], ...] - empty if no partner ever contacted this company
    const contacts = Object.entries(partners ?? {})

    // requirement: output: ${company}: No current relationship
    if (contacts.length === 0) {
        return `${company}: No current relationship`
    }

    // strongest first, ties broken alphabetically so output is deterministic
    contacts.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    const [best, bestStrength] = contacts[0]

    // requirement: output: ${company}: ${partner} (${count})
    return `${company}: ${best} (${bestStrength})`
}

const analyzeNetworkProcessor = (input) => {
    // main processing logic
    const partners = [];
    const companies = [];
    const employeeToCompany = {};
    // strengthByCompany = { partners { contact: count } }
    const strengthByCompany = {};

    const inputLines = input.split('\n');
    inputLines.forEach((line, i) => {
        const inputText = line.trim().split(/\s+/); //google
        const [command, ...args] = inputText;

        switch (command) {
            case 'Partner':
                partners.push(args[0])
                break;

            case 'Company':
                companies.push(args[0]);
                break;

            case 'Employee': {
                const [name, contact] = args
                employeeToCompany[name] = contact
                break;
            }

            case 'Contact': {
                const [employee, partner, type] = args;
                const company = employeeToCompany[employee];
                if (!strengthByCompany[company]) {
                    strengthByCompany[company] = {}
                }
                const companyPartners = strengthByCompany[company];
                companyPartners[partner] = ((companyPartners[partner] ?? 0) + 1);
                break;
            }

            default:
                break;
        }
    })

    const report = [...companies] // google
        .sort((a, b) => a.localeCompare(b))
        .map((company) => formatCompanyLine(company, strengthByCompany[company]))
        .join('\n')

    return { report };
}

const analyzeNetwork = () => {
    // node -> analyzeNetwork.js -> readInput() -> analyzeNetworkProcessor() -> return report
    const { report } = analyzeNetworkProcessor(readInput())
    if (report) {
        console.log(report)
    }
};

analyzeNetwork();