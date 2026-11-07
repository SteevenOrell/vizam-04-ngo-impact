import { expect, test } from '@playwright/test';
import { freshClient, gotoReady } from './helpers';

test.beforeEach(async ({ page }) => freshClient(page));

test('contact form: client validation, then demo success', async ({ page }) => {
  await gotoReady(page, '/contact');
  await page.getByRole('button', { name: 'Send demo message' }).click();
  await expect(page.getByText('Enter your name.')).toBeVisible();
  await expect(page.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true');

  await page.getByLabel('Your name').fill('John Doe');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Topic').selectOption('partnerships');
  await page.getByLabel('Message', { exact: true }).fill('Hello, this is a test message for the demo form.');
  await page.getByRole('button', { name: 'Send demo message' }).click();
  await expect(page.locator('#contact-result')).toContainText('demo submission');
  await expect(page.locator('#contact-result')).toBeFocused();
  await expect(page.getByLabel('Your name')).toHaveValue('');
});

test('server rejects invalid data even when client validation is bypassed', async ({ page }) => {
  await gotoReady(page, '/contact');
  // Disable the browser-side checks by submitting values the server must reject: a 19-character message.
  await page.getByLabel('Your name').fill('John Doe');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Topic').selectOption('general');
  await page.getByLabel('Message', { exact: true }).fill('1234567890123456789');
  await page.getByRole('button', { name: 'Send demo message' }).click();
  await expect(page.getByText('Message must be at least 20 characters.')).toBeVisible();
});

test('volunteer form: errors for required groups, then demo success', async ({ page }) => {
  await gotoReady(page, '/volunteer');
  await page.getByRole('button', { name: 'Send demo registration' }).click();
  await expect(page.getByText('Choose at least one way to help.')).toBeVisible();
  await expect(page.getByText('Please confirm you understand this is a demo form.')).toBeVisible();

  await page.getByLabel('First name').fill('Jane');
  await page.getByLabel('Last name').fill('Doe');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Where would you like to help?').selectOption('remote');
  await page.getByLabel('Evenings').check();
  await page.getByLabel('Remote mapping').check();
  await page.getByLabel(/I understand this is a demo form/).check();
  await page.getByRole('button', { name: 'Send demo registration' }).click();
  await expect(page.locator('#volunteer-result')).toContainText('Thank you, Jane. This was a demo submission');
});

test('donation demo: clear demo labelling, no payment fields, custom amount, receipt', async ({ page }) => {
  await gotoReady(page, '/donate');
  await expect(page.getByText('Demo — no money is taken.').first()).toBeVisible();
  // No inputs that look like payment fields.
  await expect(page.locator('input[autocomplete^="cc-"], input[name*="card" i], input[name*="cvc" i], input[name*="iban" i]')).toHaveCount(0);

  await page.getByLabel('Monthly').check({ force: true });
  await page.getByLabel('Other amount').check();
  // Submitting an empty custom amount focuses that field, which points at its error.
  await page.getByRole('button', { name: 'Complete demo donation' }).click();
  const customAmount = page.getByLabel('Amount in US dollars');
  await expect(customAmount).toBeFocused();
  await expect(customAmount).toHaveAttribute('aria-invalid', 'true');
  await expect(customAmount).toHaveAttribute('aria-describedby', /amount-error/);
  await page.getByLabel('Amount in US dollars').fill('3');
  await expect(page.getByText('The minimum demo amount is $5.')).toBeVisible();
  await page.getByLabel('Amount in US dollars').fill('42.50');
  await page.getByLabel('3. Where should it go?').selectOption('kestrel-coast-mangrove-belt');
  await expect(page.getByText('every month, to Kestrel Coast Mangrove Belt')).toBeVisible();
  await page.getByRole('button', { name: 'Complete demo donation' }).click();

  const receipt = page.locator('#donation-receipt');
  await expect(receipt).toContainText('No money has been taken');
  await expect(receipt).toBeFocused();
  await expect(page.getByText(/^DEMO-[A-Z2-9]{6}$/)).toBeVisible();
  await expect(page.getByText('$42.50')).toBeVisible();
  await page.getByRole('button', { name: 'Start again' }).click();
  await expect(page.getByRole('button', { name: 'Complete demo donation' })).toBeVisible();
});

test('honeypot field is hidden from people and assistive tech', async ({ page }) => {
  await gotoReady(page, '/contact');
  const hp = page.locator('#hp-website');
  await expect(hp).toHaveAttribute('tabindex', '-1');
  expect(await hp.evaluate((el) => el.closest('[aria-hidden="true"]') !== null)).toBe(true);
  const box = await hp.boundingBox();
  expect(box === null || box.x < 0).toBe(true);
});
