import { test as base } from '@playwright/test';

let counter = 0;

type TestFixtures = {
  counterFixture: number;
};

const test = base.extend<TestFixtures>({
  counterFixture: [
    async ({}, use) => {
      counter++;
      await use(counter);
    },
    //{ scope: 'worker' }, // runs once per worker process,
    { scope: 'test' }, // runs once per worker process, THIS IS DEFAULT SCOPE
  ],
});

test('Test 1', async ({ counterFixture }) => {
  console.log(`Test 1 Counter: ${counterFixture}`);
});

test('Test 2', async ({ counterFixture }) => {
  console.log(`Test 2 Counter: ${counterFixture}`);
});

test('Test 3', async ({ counterFixture }) => {
  console.log(`Test 3 Counter: ${counterFixture}`);
});

// 🧪 Note: Run this test using the following command:
// npx playwright test "tests/design-patterns/fixtures/fixtures-scope-and-isolation.spec.ts" --workers=1

/*
📘 Interpretation:

- The `'test'` scope calls the fixture **before every test**, unlike the `'worker'` scope,
  which calls it only once per worker process.

- If 1 worker is used, the fixture runs once.
  If 2 workers are running, the fixture runs twice, and so on.

🧠 Example:
If you have 2 tests to execute but request 100 workers, the fixture will only be called twice —
once per worker, not once per test.

✅ The `test` scope ensures each test runs in its **own isolated environment**,
   avoiding shared state or side effects between tests.
*/

/*
💡 Fixtures provide **reusability** and **encapsulation**, keeping your code clean,
maintainable, and focused on logic rather than setup.
*/
