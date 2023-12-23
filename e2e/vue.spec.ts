// e2e/test.spec.ts

import { test, expect } from '@playwright/test';

test('Add and delete transaction', async ({ page }) => {
  await page.goto('/');

  await page.fill('#text', 'Test Transaction');
  await page.fill('#amount', '10');
  await page.click('.btn');

  // Check if the transaction is added to the list
  await page.waitForSelector('.list li:has-text("Test Transaction")');

  // Check if the balance is updated
  const balanceText = await page.textContent('#balance');
  expect(balanceText).toContain('10');

  await page.click('.delete-btn');

  // Check if the balance is updated after deletion
  const updatedBalanceText = await page.textContent('#balance');
  expect(updatedBalanceText).toContain('0');
});

test('Validate form submission without required fields', async ({ page }) => {
  await page.goto('/');
  await page.click('.btn');

  // Check if an error toast is displayed
  const toastMessage = await page.textContent('.Vue-Toastification__toast-body');
  expect(toastMessage).toContain('you have to fill text and amount fields.');
});


test('Validate from input amount with random string but not number', async ({ page })=> {
  await page.goto('/');

  await page.fill('#text', 'Test Transaction');
  await page.fill('#amount', 'random');
  await page.click('.btn');

  const toastMessage = await page.textContent('.Vue-Toastification__toast-body');
  expect(toastMessage).toContain('Amount must be a valid number.');

})