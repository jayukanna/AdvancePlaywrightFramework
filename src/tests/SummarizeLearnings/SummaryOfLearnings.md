# Summary of Playwright Learnings

## 01 – Basic Exercises
| File | What it does | Key learning |
|---|---|---|
| `LoginExercise.spec.ts` | Logs in to VWO with email/password. | `page.goto()` options (`waitUntil`, `timeout`, `referer`); `locator('#id').fill()` / `.click()` |
| `WrongLogin.spec.ts` | Enters invalid VWO credentials and checks the error message. | Storing locators in variables; `expect(locator).toContainText()` |
| `tta_login.spec.ts` | Codegen-recorded login on The Testing Academy. | `getByRole('textbox', { name })`, `press('Tab')`, `getByTestId()` |
| `wingifyxpath.spec.ts` | Wingify free-trial form with an invalid email; checks the validation message. | `.check()` on checkboxes, `:visible` CSS filter, XPath `contains(@class, …)`, `.first()`, `textContent()` |

## 02 – Demo
| File | What it does | Key learning |
|---|---|---|
| `example.spec.ts` | Default Playwright sample: title check and "Get started" link. | `expect(page).toHaveTitle()`, `toBeVisible()` |
| `getByroleexample.spec.ts` | Fills VWO login using role locators. | `getByRole()` with accessible `name`; `page.pause()` for debugging |
| `katalonDemo.spec.ts` | Logs in to Katalon CURA and checks the "Make Appointment" heading. | Asserting a heading with `getByRole('heading')` |
| `EgForContext.spec.ts` | Opens two separate browser contexts (admin and user) at once. | `browser.newContext()`: isolated sessions in one test; closing pages and contexts |

## 03 – Session Storage
| File | What it does | Key learning |
|---|---|---|
| `SessionStorageExample.ts` | Script that logs in to SauceDemo and saves the session to `MystorageState.json`. | `context.storageState({ path })`, `dotenv` for credentials, `waitForURL()` |
| `UsingSessionStorageFile.spec.ts` | Opens the inventory page already logged in using the saved session. | `test.use({ storageState })` skips the login step; `screenshot: 'on'` |

## 05 – Multiple Elements
| File | What it does | Key learning |
|---|---|---|
| `Mulelement.spec.ts` | Loops through all panel links, prints text/href, clicks "Forgotten Password". | `locator().all()` returns `Locator[]`; `innerText()`, `getAttribute('href')` |

## 06 – GetByX Locators
| File | What it does | Key learning |
|---|---|---|
| `GetByX.spec.ts` | Fills a practice form, submits, resets, and checks the result message each time. | `test.beforeEach()`, `getByRole('textbox' / 'button')`, `getByTestId()`, `toHaveText()` |

## 07 – Web Elements & Web Tables
| File | What it does | Key learning |
|---|---|---|
| `UsingFilter.spec.ts` | Clicks "Forgotten Password" using a filter instead of a loop; checks the toast and URL. | `locator().filter({ hasText })`, `toHaveURL(/regex/)` |
| `Webtable_Click.spec.ts` | Finds Rohan Mehta's row and ticks its checkbox. | Filter a row, then a chained locator inside it; `.check()`, `toBeChecked()` |
| `Webtable_Identify.spec.ts` | Reads every cell of a table and finds "Helen Bennett". | Dynamic XPath `tr[i]/td[j]` built in nested loops; `count()` for rows/cols |
| `MultielementWithPagination.spec.ts` | Searches page by page for "Luca Greco" until found. | `while` loop + `count()`; `isDisabled()` on the Next button to stop |

## 08 – OrangeHRM (end-to-end)
| File | What it does | Key learning |
|---|---|---|
| `OrangeHRM.spec.ts` | Login → add employee → check success toast → search by Employee Id → select → delete. | Full CRUD flow; random test data so the test can be re-run; `locator(css, { hasText })`; `toHaveCount(1)`; `nth()` |

## 09 – Dropdowns
| File | What it does | Key learning |
|---|---|---|
| `SimpleDropdown.spec.ts` | Picks "Option 1" from a native `<select>`. | `selectOption()` works only on real `<select>` elements |
| `CustomDropdown.spec.ts` | Opens custom (div-based) dropdowns and picks options. | Custom dropdowns: click the trigger, then click `getByRole('option')` |
| `MultiOption.spec.ts` | Multi-select (Pytest, Mocha, JUnit) and a type-ahead (async) city picker. | `getByText(…, { exact: true })`, `keyboard.press('Escape')`, wait for suggestions before clicking |

## 10 – iFrames & Hover
| File | What it does | Key learning |
|---|---|---|
| `iFrameExample.spec.ts` | Fills a vehicle form that sits inside an iframe. | `page.frameLocator('#frame-one').locator(…)` |
| `HoverExample.spec.ts` | Hovers SpiceJet's "Add-ons" menu and clicks a link that opens a new tab. | `hover()`; `context().waitForEvent('page')` **before** clicking; `test.setTimeout()` for slow sites |

## 11 – Keyboard
| File | What it does | Key learning |
|---|---|---|
| `KeyPress.spec.ts` | Presses "A" on the keycode site and takes a screenshot. | `page.keyboard.press('KeyA')`, `page.screenshot({ path })` |

## 12 – Drag and Drop
| File | What it does | Key learning |
|---|---|---|
| `DragandDrop.spec.ts` | Drags column A onto column B. | `locator.dragTo(target)` |
| `SwimlaneDrag.spec.ts` | Moves a card from To Do to In Progress on a board and checks the column counts. | `dragTo(…, { targetPosition })` when the drop target's centre is off-screen; `toHaveCount(0)` to prove the card left |

## 13 – JS Alerts
| File | What it does | Key learning |
|---|---|---|
| `HandlingJSAlerts.spec.ts` | Handles alert, confirm, and prompt dialogs. | `page.once('dialog', …)` must be registered **before** the click; `dialog.type()`, `message()`, `accept(text)`, `dismiss()` |

## 14 – SVG Elements
| File | What it does | Key learning |
|---|---|---|
| `SVGCircle.spec.ts` | Clicks the blue SVG circle and checks the output panel. | SVG nodes take normal CSS selectors; `#id` matches `id`, not `data-testid` (use `getByTestId()` for that) |
| `SVGElements.spec.ts` | Searches Flipkart for "macmini" and prints matching product cards. | XPath with `or` conditions; wait for elements (`waitFor()`), not `networkidle` |

## 15 – Shadow DOM
| File | What it does | Key learning |
|---|---|---|
| `ExerciseForShadowDOM.spec.ts` | Fills email and password inside a shadow-DOM card, submits, and checks the status output. | Playwright's CSS and `getBy…` locators reach into open shadow roots automatically, so there is no special API. Scope to the host (`shadowHost.getByTestId(…)`) and chain from there. |
| `SelectorsHubShadowDOM.spec.ts` | Fills fields on SelectorsHub that sit inside an open shadow root and inside a **closed** shadow root nested in it. | Locators can't reach into a closed shadow root (`#training` times out). Fix: before `page.goto`, use `page.addInitScript()` to override `Element.prototype.attachShadow` so every root is created as `mode: 'open'`. |

## 16 – Counter Cart (Shadow DOM)
| File | What it does | Key learning |
|---|---|---|
| `CounterCart.spec.ts` | Clicks `+` twice inside the `<tta-counter>` shadow host and checks the value goes from 3 to 5. | A chained locator is a two-step search. If the host isn't found, nothing inside it is found either. `#counter-cart` failed because `counter-cart` was the `data-testid`, not the `id` (`counter-1`); `getByTestId('counter-cart')` fixed it. |

## 17 – File Upload
| File | What it does | Key learning |
|---|---|---|
| `FileUploadExample.spec.ts` | Uploads `testdata.txt` on the-internet, clicks Upload, and checks "File Uploaded!". | `path.join(__dirname, 'file')` builds the file path; `setInputFiles(selector, filePath)` |
| `FileuploadWithoutSubmitButton.spec.ts` | Uploads one file on TTA, which has no Upload button, and checks the preview and output panel. | No button is needed: `setInputFiles()` fires the input's `change` event and the page reacts. Assert what the page shows afterwards. |
| `FileMultipleUploads.spec.ts` | Uploads two files to the `multiple` input on TTA. | Pass an array: `setInputFiles([file1, file2])`. Copy test ids from DevTools: the page used `multi-upload`, not `multiple-upload`. |
| `FileUploadFromPatternfly.spec.ts` | Uploads two screenshots to PatternFly's multiple file upload and checks both appear in the status list. | Target the hidden `input[type="file"]`, not the Upload button (a `<button>` gives "Node is not an HTMLInputElement"). Uploaded files appear as `.pf-v6-c-multiple-file-upload__status-item` rows. |

## 17 – Scroll Example
| File | What it does | Key learning |
|---|---|---|
| `scrolleample.spec.ts` | Opens the TTA scroll widget page and scrolls to the bottom. | `page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))` runs JavaScript inside the browser to scroll the page. To bring one element into view, use `locator.scrollIntoViewIfNeeded()` instead. |

## 18 – Expect Assertions
| File | What it does | Key learning |
|---|---|---|
| `ExpectAssertions.spec.ts` | Checks that the `#page-title` heading contains "Multiple Element Filter". | Use `toContainText()` on a locator, not `toContain()`. The heading reads "multiple element filters" in lowercase, so the regex needs the `i` flag: `/Multiple Element Filter/i`. |
| `ExpectToHaveAttributes.spec.ts` | Checks that the footer has 16 links. | `locator('footer a')` matches every `<a>` inside the `<footer>`; `await expect(locator).toHaveCount(16)` asserts how many elements were found (and retries until the count matches). |

## 19 – Filter From Link
| File | What it does | Key learning |
|---|---|---|
| `FilterFromLink.spec.ts` | Clicks "Transactions" in the Account navigation list and checks the URL ends with `#transactions`. | `locator('.list-group-item').filter({ hasText: 'Transactions' })` narrows many matches down to one before clicking. `toHaveURL()` with a plain string needs the **full** URL; a regex like `/#transactions$/` checks just the end. |

## 20 – Test Hooks & Execution Order
| File | What it does | Key learning |
|---|---|---|
| `TestHookExample.spec.ts` | Runs a `test.describe.serial` block of 3 steps, then two standalone tests. | `test.describe.serial` keeps order only **inside** its block. With `fullyParallel: true`, the standalone tests ran first and in between the steps. Adding `test.describe.configure({ mode: 'default' })` at the top of the file makes the whole file run top to bottom in one worker: steps 1–3, then standalone 1 and 2. |
| `275_TestHooks.spec.md` | Cheat sheet for the `test` API: modifiers, suites, hooks, fixtures, `test.info()`. | Hook order: `beforeAll` → (`beforeEach` → test → `afterEach`) × N → `afterAll`. A hook's scope is the file, or the `describe` block it sits in. |

## 21 – Data-Driven Testing
| File | What it does | Key learning |
|---|---|---|
| `UseData.json` | Holds test data: `ValidUserDetails` and `InvalidUserDetails`, each with `UserName` and `Password`. | Keep test data out of the test code. In JSON, entries must be separated by **commas**; a missing `,` after `}` breaks the file, and the spec importing it fails to load. |
| `AccessingDataFromJson.spec.ts` | Imports the JSON and prints the valid and invalid user details. | `import data from './UseData.json'`, then read values with dot notation: `data.ValidUserDetails.UserName`. Needs `"resolveJsonModule": true` in `tsconfig.json`. |

---

## Key lessons learned along the way
- **Each test gets a fresh page.** Nothing carries over between tests; put shared setup in `beforeEach`.
- **`page` only exists inside a test or hook.** Code placed directly inside `describe` can't use it.
- **Prefer web-first assertions** (`await expect(locator).toHaveText()` / `toContainText()`). They retry. `expect(await locator.textContent())` reads once and can flake.
- **Avoid `waitForLoadState('networkidle')`** on busy sites (e.g. Flipkart). It may never finish. Wait for the element you need instead.
- **`textContent()` vs `innerText()`:** `innerText()` returns visible, rendered text (HTML elements only). `textContent()` returns raw text, including hidden text, and also works on SVG.
- **Register listeners before the action.** This applies to dialogs (`page.once('dialog')`) and new tabs (`waitForEvent('page')`).
- **Check the real attributes in DevTools** before writing a locator (`id` vs `data-testid` vs `aria-label`).
- **Shadow DOM needs no extra work for open shadow roots.** CSS and `getBy…` locators reach inside them. XPath does **not** go into shadow roots.
- **Closed shadow roots are hidden from Playwright.** DevTools labels them `#shadow-root (closed)`, and the browser blocks scripts from reading inside them (`host.shadowRoot` is `null`), so any locator times out. To reach them, force the roots open before the page loads:
  ```ts
  await page.addInitScript(() => {
    const original = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (init) {
      return original.call(this, { ...init, mode: 'open' });
    };
  });
  ```
  `addInitScript` runs before the site's own scripts, so the root is already open when the site builds it. A weaker fallback is to `Tab` into the closed field and use `page.keyboard.type()`, but that depends on the field order.
- **`test.use()` options that need a new worker can't go inside `describe`.** `screenshot` is one of them. Put it at the top of the file or in `playwright.config.ts`.
- **Always `await page.pause()`.** Without `await`, the test doesn't stop there and runs to the end.
- **`getByTestId()` matches only `data-testid`**, never `id`. Use `#value` for `id`. (`testIdAttribute` in the config can change which attribute it reads, but it still reads only one.)
- **`type="file"` is how you identify the upload component.** `setInputFiles()` only works on an `<input type="file">`. The visible "Upload" / "Choose File" / "Browse" control is usually a `<button>`, `<label>` or `<div>` that just opens the OS dialog, so setting files on it fails with "Node is not an HTMLInputElement". In DevTools, search for `type="file"` to find the real input, then scope to it, for example `page.locator('.pf-v6-c-multiple-file-upload input[type="file"]')`.
  - The file input is often **hidden**. That's fine, because `setInputFiles()` doesn't need it to be visible.
  - An input with the `multiple` attribute accepts an array of files.
  - To go through the button instead, start `page.waitForEvent('filechooser')` **before** clicking it, then call `fileChooser.setFiles(…)`.
- **In a CSS selector, a space means "inside", not "and".** For an element with `class="a b"`, write `.a.b` (no space). `.a b` looks for a `<b>` tag inside `.a`.
- **`path` is built into Node.js.** No install is needed. Its TypeScript types come from `@types/node`, and the project's `tsconfig.json` (`"types": ["node"]`) makes VS Code recognise `path` and `__dirname`.
- **Set `"resolveJsonModule": true` in `tsconfig.json` to import JSON files.** Without it, VS Code underlines `import data from './UseData.json'` with *"Cannot find module … Consider using '--resolveJsonModule'"*.
  ```json
  {
    "compilerOptions": {
      "esModuleInterop": true,
      "resolveJsonModule": true
    }
  }
  ```
  - Playwright can still run the test without it. The setting is for TypeScript and VS Code: it removes the error and gives **autocomplete and type checking** on the data. A typo like `data.ValidUserDetails.Username` (lowercase `n`) is then caught before you run.
  - `esModuleInterop: true` (already on in this project) lets you write `import data from …` instead of `import * as data from …`.
  - If a JSON file has a syntax error, such as a missing comma, the import fails and the whole spec file fails to load. VS Code marks the bad line in red in the `.json` file.
- **Turn on file name extensions in Windows Explorer.** A file that looks like `secondfile.txt` may really be `secondfile.txt.txt`.
- **Rule of thumb for matchers:** use `toContain` / `toBe` / `toEqual` on plain values (strings, numbers, arrays), and `toContainText` / `toHaveText` / `toBeVisible` on locators. Calling `toContain()` on a locator fails, because a locator is not a string.
  ```ts
  expect('hello world').toContain('world');                    // plain value
  await expect(page.locator('#page-title')).toContainText('x'); // locator
  ```
- **Scrolling is usually automatic.** Playwright scrolls an element into view before `click()`, `fill()` and similar actions. Scroll by hand only when the page itself reacts to scrolling (lazy loading, infinite lists) or for a screenshot.
  - `scrollBy(x, y)` moves **relative** to where you are, so `scrollBy(0, 0)` does nothing. To jump back to the top, use `window.scrollTo(0, 0)`.
  - `page.mouse.wheel(0, 500)` scrolls like a real user's mouse wheel.
- **`filter({ hasText })` matches part of the text and ignores case.** `hasText: 'Trans'` would also match "Transactions". For an exact match, use a regex: `hasText: /^Transactions$/`.
- **If a test fails for you but passes elsewhere, check how it was run.** Save the file first (Ctrl+S), because Playwright runs what's on disk, not what's in the editor. Also check which browser project (`[chromium]`, `[firefox]`, `[webkit]`) the error names.
- **Controlling execution order.** With `fullyParallel: true` in the config, every test in every file can run at the same time on different workers, so the order they're written in is **not** the order they run in.

  | Setting (at the top of the file or on a `describe`) | What happens | If a test fails |
  |---|---|---|
  | none (`fullyParallel: true`) | Tests are spread across workers in any order | Other tests carry on |
  | `test.describe.configure({ mode: 'default' })` | Tests in the file run top to bottom in one worker | Other tests still run |
  | `test.describe.configure({ mode: 'serial' })` or `test.describe.serial(...)` | Tests run top to bottom in one worker | **All later tests are skipped** |
  | `test.describe.configure({ mode: 'parallel' })` | Tests in the file run in parallel even without `fullyParallel` | Other tests carry on |

  - `test.describe.serial(...)` affects only the tests **inside** that block. Tests outside it are not made to wait for it.
  - To run the serial block first and then the standalone tests, use `mode: 'default'` for the file and keep `test.describe.serial` for the dependent steps. If a step fails, only the remaining steps are skipped; the standalone tests still run.
  - `configure()` applies only to the file it's in. Other spec files still run in parallel.
  - `--workers=1` on the command line also forces one-at-a-time order, but for the **whole run**.
- **The green ▶ in VS Code runs only what it sits next to.** The ▶ beside a `describe` runs only the tests in that block, so tests outside it won't appear in the results. Use the ▶ beside the file, or `npx playwright test <file>`, to run everything.
- **Read the `Expected` / `Received` lines when an `expect` fails.** If `Received` shows real text, the locator found the element and the problem is the expected value. If the log only says "waiting for locator" and then times out, the locator is the problem.
- **String matching in assertions is case-sensitive.** "Multiple" does not match "multiple".
- **Regex flags.** A regex is written `/pattern/flags`, and the flags after the closing `/` change how it matches.

  | Flag | Meaning |
  |---|---|
  | `i` | ignore case: `/multiple/i` matches "Multiple", "multiple" and "MULTIPLE" |
  | `g` | global: find all matches, not just the first (mostly for `string.replace` / `match`) |
  | `m` | multiline: `^` and `$` match at the start and end of each line |

  Flags can be combined, as in `/hello/gi`. In Playwright, `i` is the one you'll use most:
  ```ts
  await expect(page.locator('h1')).toHaveText(/welcome/i);
  await page.getByRole('button', { name: /submit/i }).click();
  ```
