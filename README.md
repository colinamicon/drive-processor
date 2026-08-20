# Drive Capital Network Analysis

## Requirements
### Nodejs
- uses built-in `fs.readFileSync()`

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
- Stack: VSCode (JS Debug Terminal), nodejs

## Data
- `companies`: `[]` array of declared company names, sorted at report time
- `employeeToCompany`: `{}` plain object: employee names are unique, so each maps to exactly one company
- `strengthByCompany`: a nested `{}` of `company -> partner -> count`, built as data streams in
- A partner only gets an entry under a company once they appear in a `Contact` with one of its employees

## Design
- Every contact counts as 1

## Assumptions
- Input is well formatted. Validation is intentionally minimal
- Companies with no employees or contacts print: `No current relationship`
- Blank lines and trailing newlines are skipped
- The program should only accept the contact types `email`, `call`, or `coffee` as lowercase values

## Tools & LLMS
- I used an LLM (Claude) to:
    - check my work and make enhancements
    - generate a larger input text file (input.txt) based on the provided example & Silicon Valley References
    - optimize the `formatCompanyLine` function
- I used Google to:
    - help with regex
    - help with .sort().map().join() function chain for syntax to build the report 
    - research node `process.exit(1)` statuses
- I used the VSCode Javascript Debug Terminal to run the program, debug and analyze the current state

## Git Commit flow
- Initial commit: initialize repo
- Second commit: main processing logic
- Third commit: bugfixes & error handling
