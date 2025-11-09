import {test as base, expect, type Page} from '@playwright/test'

type TestFixtures = {
  testData: { email: string; password: string };
};

const test = base.extend<TestFixtures>({
    testData: async ({}, use) => {
        const data = { email: 'test@example.com', password: 'pass123' };
        await use(data);
    },
});

export { test, expect };

