# Advance Playwright Framework

## 1. What is an Advance Playwright Framework?

A plain Playwright project is just test files: each `.spec.ts` opens a page, finds elements, clicks, and checks results, all in one place. That is fine for 5 tests, but at 500 tests it becomes painful:

- The same locator (e.g. the login button) is copied into dozens of files. When the UI changes, you fix it dozens of times.
- URLs, usernames and passwords are hard-coded everywhere.
- Every test repeats the same setup (open site → log in → go to page).
- When a test fails in CI, there is little information about *why*.

An **Advance Playwright Framework** is the same Playwright engine wrapped in a **structure** that solves these problems. Each kind of code gets its own folder and its own job:

| Problem | Framework answer | Folder |
|---|---|---|
| Locators copied everywhere | Page Object Model: one class per page | `src/pages/` |
| Repeated click/fill/wait code | Reusable helper methods | `src/utils/` |
| Hard-coded data | Test data kept in files | `src/testdata/` |
| Hard-coded URLs / secrets | Environment config + `.env` | `src/config/`, `.env` |
| Repeated setup in every test | Custom Playwright fixtures | `src/fixtures/` |
| Testing APIs as well as UI | API client classes | `src/api/` |
| "Why did it fail?" | Logger, screenshots, video, trace, custom report | `src/utils/`, `playwright.config.ts` |
| Running tests automatically | CI pipeline | `.github/` |

## 2. Purpose of the framework

1. **Maintainability:** a UI change is fixed in one page class, not in every test.
2. **Readability:** tests read like steps a manual tester would write:
   `loginPage.login(user, pass)` → `cartPage.clickCart()` → `expect(...)`.
3. **Reusability:** pages, helpers, fixtures and data are shared by all tests.
4. **Separation of concerns:**
   - *Pages* know **how** to talk to the UI (locators + actions).
   - *Tests* know **what** to check (steps + assertions).
   - *Data/config* know **with which values** and **on which environment**.
5. **Scalability:** new tests are mostly "call existing page methods", so the suite can grow quickly.
6. **Debuggability:** logs, screenshots, videos, traces and HTML/Allure/custom reports show exactly what happened.
7. **CI-ready:** the same command (`npx playwright test`) runs locally and in GitHub Actions, with retries and environment variables.

## 3. Folder structure

```
AdvancePlaywrightFramework/
├── .github/                 → CI/CD pipeline (GitHub Actions)        [empty: .gitkeep]
├── .vscode/                 → VS Code settings for this project
├── docs/                    → Framework documentation                [empty: .gitkeep]
├── rules/                   → Coding rules / conventions             [empty: .gitkeep]
├── src/
│   ├── api/                 → API request classes                    [empty: .gitkeep]
│   ├── config/              → Environment-specific settings          [empty: .gitkeep]
│   ├── fixtures/            → Custom Playwright fixtures             [empty: .gitkeep]
│   ├── pages/               → Page Object classes (POM)
│   ├── testdata/            → JSON / CSV / Excel test data           [empty: .gitkeep]
│   ├── tests/               → The .spec.ts test files + notes
│   └── utils/               → Helpers: element actions, logger, custom reporter
├── .env                     → Environment variables (BASE_URL, …) – never commit secrets
├── package.json             → Project name, scripts, dependencies
├── package-lock.json        → Exact installed versions (auto-generated)
├── playwright.config.ts     → Playwright settings (browsers, reporters, video/trace…)
├── tsconfig.json            → TypeScript settings + path aliases (@pages/*, @utils/* …)
│
│   Generated when tests run (not written by hand):
├── node_modules/            → Installed packages
├── test-results/            → Screenshots, videos, traces per test (wiped each run)
├── playwright-report/       → Playwright HTML report
├── allure-results/          → Raw data for the Allure report
└── tta-report/              → Output of the custom TTA reporter
```

> **What is `.gitkeep`?** Git does not store empty folders. An empty file called `.gitkeep` is put inside a folder only so Git keeps the folder. Delete it once the folder has real files.

## 4. Folder-by-folder explanation

### `src/` – all framework code
Everything you write lives under `src/`. `playwright.config.ts` points Playwright here with `testDir: './src/tests'`, and `tsconfig.json` includes `./src/**/*.ts`.

---

### `src/pages/` – Page Object Model (POM)
**Purpose:** one class per screen of the application. Each class holds:
- **Locators**: *where* the elements are (`readonly loginButton: Locator`).
- **Actions**: *what you can do* on that page (`async login(user, pass)`).

**Rule:** tests never call `page.locator(...)` themselves; they call the page class.

| File | What it represents |
|---|---|
| `BasePage.ts` | **Abstract** parent class. Every page can `extends BasePage` to get `page`, `el` (UtilElementLocator), `log` (logger) and `goto(path)`. You cannot do `new BasePage()`; it only exists to be inherited. |
| `loginPage.ts` | Login screen: username, password, login button; `goto()`, `LoginWithUserNameandPassword()` |
| `AddCartPage.ts` | Inventory page: "add red T-shirt" button, cart badge; `addRedTShirtToCart()` |
| `CartPage.ts` | Cart link; `clickCart()` |
| `CheckoutStepone.ts` | Checkout step 1 (customer details) |
| `CheckOutStepTwo.ts` | Checkout step 2 (overview) |
| `CheckoutCompleteBackHome.ts` / `BackHome.ts` | Order complete page / back-home button |

Example: what a test looks like when it uses page objects:
```ts
await loginPage.LoginWithUserNameandPassword('standard_user', 'tta_secret');
await addCartPage.addRedTShirtToCart();
await expect(addCartPage.cartBadge).toHaveText('1');
```

---

### `src/tests/` – test specs
**Purpose:** the actual tests (`*.spec.ts`). They contain **steps and assertions only**; no raw selectors.

- `01_PageObjectModel/LoginToTTAUsingPOM.spec.ts`: login (valid/invalid), add to cart, open cart, using the page objects.
- `SummarizeLearnings/`: these notes (`SummaryOfLearnings.md`, `Assertions_CheatSheets.md`, this file). They are not tests; Playwright only runs files ending in `.spec.ts` / `.test.ts`.

Tests are grouped in numbered folders (`01_…`, `02_…`) so they appear in learning order.

---

### `src/utils/` – reusable helpers
**Purpose:** code that is not tied to any one page and is used everywhere.

| File | What it does |
|---|---|
| `UtilElementLocator.ts` | Wrapper around common actions: `click`, `fill`, `getText`, `waitForVisible`, `selectByText` … Accepts either a CSS string or a `Locator` (type `Flex`), applies a default 15 s timeout, and logs each action. |
| `logger.ts` | Winston logger. `createLogger('LoginPage')` gives log lines like `2026-06-02 07:40:01 [info] [LoginPage] clicked …`. Writes to the console and to `logs/combined.log`. Level set by `LOG_LEVEL` in `.env`. |
| `CustomReporter.ts` | Custom Playwright reporter that builds the TTA HTML report (`tta-report/index.html`) with steps, screenshots, video and trace per test. Registered in `playwright.config.ts` under `reporter`. |

---

### `src/testdata/` – test data *(empty for now)*
**Purpose:** keep input values outside the tests, e.g. `users.json`, `products.csv`, `checkout.xlsx`.
The project already installs the libraries to read them: `csv-parse` (CSV), `xlsx` (Excel), `@faker-js/faker` (random data such as names and emails).
**Why:** the same test can run with many data sets (data-driven testing), and changing data does not mean changing code.

---

### `src/config/` – environment configuration *(empty for now)*
**Purpose:** settings that change per environment (dev / QA / staging / prod): base URLs, API URLs, timeouts, feature flags.
Typically a file like `env.ts` reads `process.env.ENV` (from `.env`) and returns the matching settings.
Today the values live in `.env` (`ENV`, `BASE_URL`, `API_BASE_URL`) and `playwright.config.ts` loads them with `dotenv.config()` and uses `baseURL: process.env.BASE_URL`.

---

### `src/fixtures/` – custom fixtures *(empty for now)*
**Purpose:** Playwright *fixtures* are ready-made objects a test can ask for in its parameters, like the built-in `{ page }`. You can add your own, such as `{ loginPage, cartPage }` or an already-logged-in page.
**Why:** removes repeated `new LoginPage(page)` lines and `beforeEach` setup from every test.
```ts
// fixtures/pages.fixture.ts (example)
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
});
// in a spec
test('login', async ({ loginPage }) => { … });
```

---

### `src/api/` – API layer *(empty for now)*
**Purpose:** classes that call REST APIs with Playwright's `request` context, such as `AuthApi.login()` or `CartApi.addItem()`. Used for:
- pure API tests,
- fast test setup (create data through the API, then check it in the UI).

`ajv`, `ajv-formats` (JSON-schema validation) and `jsonpath-plus` (reading values out of JSON responses) are already installed for this.

---

### `.github/` – CI/CD *(empty for now)*
**Purpose:** will hold `.github/workflows/playwright.yml`, a GitHub Actions pipeline that installs dependencies and runs `npx playwright test` on every push or pull request, then uploads the reports.
`playwright.config.ts` is already CI-aware: `forbidOnly`, `retries: 2` and `workers: 1` switch on when `process.env.CI` is set.

### `docs/` – documentation *(empty for now)*
**Purpose:** how to set up, run and extend the framework, plus architecture notes, for new team members.

### `rules/` – conventions *(empty for now)*
**Purpose:** coding standards for the team (and for AI assistants), such as naming rules, "no raw locators in tests", "assertions stay in tests, not pages", and preferred locator strategies.

### `.vscode/` – editor settings
`settings.json` holds VS Code settings for this workspace (currently `python.terminal.useEnvFile`).

---

### Root files

| File | Purpose |
|---|---|
| `package.json` | Project info, the `test` script (`playwright test`) and dev-dependencies: `@playwright/test`, `typescript`, `dotenv`, `winston`, `allure-playwright`, `@faker-js/faker`, `csv-parse`, `xlsx`, `ajv`, `ajv-formats`, `jsonpath-plus`, `@types/node`. |
| `package-lock.json` | Exact versions installed, so everyone gets the same packages. Generated by npm; do not edit by hand. |
| `playwright.config.ts` | Central settings: `testDir`, parallel runs, retries, reporters (`line`, `html`, `allure-playwright`, custom TTA reporter), `baseURL`, `video/trace/screenshot: 'on'`, Chromium at 1920×1080. |
| `tsconfig.json` | TypeScript settings (`strict`, ES2022) and **path aliases** so imports are short: `@pages/*`, `@utils/*`, `@api/*`, `@config/*`, `@fixtures/*`, `@testdata/*` → e.g. `import { createLogger } from '@utils/logger'`. |
| `.env` | Secrets and environment values (`ENV`, `BASE_URL`, `API_BASE_URL`). Loaded by `dotenv`. Should be in `.gitignore`. |

### Generated folders (do not edit)

| Folder | Created by | Contains |
|---|---|---|
| `node_modules/` | `npm install` | All installed packages |
| `test-results/` | each test run | One folder per test with `test-finished-1.png`, `video.webm`, `trace.zip`. **Cleared at the start of every run.** |
| `playwright-report/` | `html` reporter | Open with `npx playwright show-report` |
| `allure-results/` | `allure-playwright` reporter | Raw data. View with `npx allure serve allure-results` (needs the Allure CLI). |
| `tta-report/` | `CustomReporter.ts` | Custom HTML report `tta-report/index.html` |
| `logs/` | `logger.ts` | `combined.log` (appears once something logs) |

## 5. How the folders were created

All the `.gitkeep` files were created at the same moment (13 Nov, 12:18), so the empty skeleton was most likely made in one go with a command or script rather than one folder at a time. The steps below build the same project from scratch.

**Step 1: create the project and install packages**
```bash
mkdir AdvancePlaywrightFramework && cd AdvancePlaywrightFramework
npm init -y                                   # creates package.json
npm i -D @playwright/test typescript @types/node dotenv winston allure-playwright \
        @faker-js/faker csv-parse ajv ajv-formats jsonpath-plus
npm i -D https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz   # xlsx comes from SheetJS CDN, not npm
npx playwright install                        # downloads the browsers
```
(`npm init playwright@latest` is the alternative. It also creates a sample `tests/` folder and config, which you would then move into `src/tests`.)

**Step 2: create the folder skeleton with `.gitkeep` files**

Git Bash / macOS / Linux:
```bash
mkdir -p .github docs rules src/{api,config,fixtures,pages,testdata,tests,utils}
for d in .github docs rules src/api src/config src/fixtures src/pages src/testdata src/tests src/utils; do
  touch "$d/.gitkeep"
done
```
PowerShell:
```powershell
$dirs = '.github','docs','rules','src/api','src/config','src/fixtures','src/pages','src/testdata','src/tests','src/utils'
foreach ($d in $dirs) { New-Item -ItemType Directory -Force $d | Out-Null; New-Item -ItemType File -Force "$d/.gitkeep" | Out-Null }
```

**Step 3: add the config files by hand**
- `playwright.config.ts`: set `testDir: './src/tests'`, reporters, `use` (baseURL, video, trace, screenshot) and projects.
- `tsconfig.json`: add the `paths` aliases for each `src/` folder.
- `.env`: add `ENV`, `BASE_URL`, `API_BASE_URL`.

**Step 4: fill the folders**
`utils/` (logger → UtilElementLocator → CustomReporter) → `pages/` (BasePage → one class per screen) → `tests/` (specs that only call page methods). Later: `testdata/`, `fixtures/`, `api/`, `config/`, `.github/workflows/`.

## 6. How a test flows through the framework

```
spec (src/tests)                → "what to test" + expect()
   └─ Page Object (src/pages)   → locators + actions for one screen
        └─ BasePage             → shared page, el, log, goto()
             └─ UtilElementLocator (src/utils) → click/fill/wait with timeout + logging
                  └─ Playwright Page            → drives the browser
data   ← src/testdata  (values to type)
config ← .env / src/config (which URL / environment)
output → test-results, playwright-report, allure-results, tta-report, logs
```
