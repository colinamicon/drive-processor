# Drive Capital Network Analysis

## Requirements
### Nodejs
- Node >= 20 (developed on 22 — `nvm use` picks it up from `.nvmrc`)
- no runtime dependencies
- uses built-in `fs.readFileSync()`

## RUN
No npm install needed to run the program itself:

**file arg**
```bash
node analyzeNetwork input.txt      # example provided
node analyzeNetwork input-2.txt    # larger dataset
npm run start input.txt            # run via npm
```

Output is printed to the console:
- one line per company
- sorted alphabetically

Invalid input exits `1` with a message on stderr:
```bash
node analyzeNetwork              # no file provided! usage: ...
node analyzeNetwork missing.txt  # error: cannot read "missing.txt" - ENOENT ...
```

## TEST
Uses the built-in Node test runner (`node:test` + `node:assert`), so there are
no testing dependencies.

```bash
npm test
```

`analyzeNetwork.js` guards its CLI call with `require.main === module`, so the
processor can be imported by a test without executing the program.

## Formatting
Prettier is the only dev dependency. Config lives in `.prettierrc` so the
editor extension, the CLI, and CI all produce the same output.

```bash
npm install         # dev tooling only
npm run format      # write
npm run format:check
```

## Approach
- `analyzeNetwork.js` entry point, main function wrapper
- `analyzeNetworkProcessor` fn: reads the input, processes and returns a report
- Stack: VSCode (JS Debug Terminal), nodejs

## Data
- `partners`: `[]` array of declared partner names, used to reject a `Contact` that references an unknown partner
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
    - generate a larger input text file (input-2.txt) based on the provided example & Silicon Valley References
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
- Fourth commit: npm & prettier formatting, gitignore
- Fifth commit: unit testing