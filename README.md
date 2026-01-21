# Tech-Test-Playwright-MCP
 
## Overview
This repository is the initial structure for a production-ready End-to-End test automation framework using Playwright Test (JavaScript / Node.js).
 
## Folder structure
```
/tests
/pages
/flows
/fixtures
/utils
/prompts
/docs
playwright.config.js
package.json
```
 
## Responsibilities
- **tests**: test specifications only (no selectors or implementation logic).
- **pages**: Page Objects (locators/selectors and low-level page interactions).
- **flows**: business flows that orchestrate multiple page actions.
- **fixtures**: test data and custom fixtures.
- **utils**: reusable helpers/utilities (environment, data builders, etc.).
- **prompts**: prompt engineering files intended for MCP / AI-assisted development.
- **docs**: framework documentation.
 
## Selector strategy
The framework is intended to use `data-testid` as the primary selector strategy.
 
## Configuration
The Playwright configuration (`playwright.config.js`) is set up for:
- Multi-browser execution (Chromium, Firefox, WebKit)
- Centralized timeouts
- Base URL support via `BASE_URL`
 
## Usage
- **Install**: `npm install`
- **Run tests**: `npm test`
- **UI mode**: `npm run test:ui`
- **Headed**: `npm run test:headed`
- **Open report**: `npm run report`