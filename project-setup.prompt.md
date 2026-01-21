# Role
You are a Senior QA Automation Architect.

# Objective
Generate the initial structure for a professional End-to-End
test automation framework using Playwright.

# Stack
- Playwright Test
- JavaScript
- Node.js
- Git
- Playwright MCP integration

# Requirements
The framework must:
- Be production-ready
- Follow Playwright best practices
- Be easy to scale and maintain
- Assume AI-assisted development (MCP)

# Mandatory Folder Structure
Create the following directories with example placeholder files:

/tests
/flows
/pages
/fixtures
/utils
/prompts
/docs

# Folder Responsibilities
- tests: test specifications only (no selectors or logic)
- pages: Page Objects
- flows: Flows
- fixtures: test data and custom fixtures
- utils: reusable helpers and utilities
- prompts: prompt engineering files used with MCP
- docs: documentation 

# Playwright Configuration
- Multi-browser support (Chromium, Firefox, WebKit)
- Centralized timeout configuration
- Use Playwright test runner
- Base URL support

# Coding Rules
- Do not generate test logic
- Do not generate assertions
- Use JavaScript
- Include comments explaining architectural decisions
- Use data-testid as selector strategy (documented, not implemented)

# Output
Return:
1. Folder tree structure
2. Example filenames per folder
3. Minimal Playwright configuration file
4. A short README.md explaining the architecture

# Notes
This output will be reviewed and extended manually.
Do not over-engineer the solution.
