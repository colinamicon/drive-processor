# Drive Capital Network Analysis

## Requirements
### Nodejs
- uses built-in `fs.readFileSync()` for STDIN

## RUN
**file arg**
```bash
node analyzeNetwork input.txt
```

Output is printed to the console:
- one line per company
- sorted alphabetically

## Approach
- `analyzeNetwork.js` entry point, main function wrapper
- `analyzeNetworkProcessor` fn: reads the input, processes and returns a report

## Data
- `companies`: [Set]
- `employeeToCompany`: Map{}: employee names are unique, maps to exactly one company
- `strengthByCompany`: a nested Map{} of `company -> partner -> count` built as data streams in
-  Partners are only stored once it appears in a   `Contact`

## Design
- Every contact counts as 1

## Assumptions
- Input is well formatted. Validation is intentionally minimal
- Companies with no employees or contacts print: `No Current Relationship`
- Blank lines and trailing newlines are skipped

# Using LLM Tools
- I used an LLM (Claude) to check my work and make enhancements
- See the git commit flow for the LLM enhancements for better error handling and brevity

