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

//note: run it using following command
// npx playwright test "tests/design-patterns/fixtures/fixtures-scope-and-isolation.spec.ts" --workers=1


/* Interpretation:
'test' Scope, will call the fixture before every test unlike 'worker' scope which called it for the number of worker instantiated and run these test.

so if 1 worker is user, fixture is called once, if 2 workers are running the test, than fixture is called twice, and so on.
Note: if you have 2 test to be executed once but requested 100 workers to execute, fixture will only call twice. */