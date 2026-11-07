import { expect, test } from '@playwright/test';
import { gotoReady } from './helpers';

test('skip link is the first focusable element and moves focus to main', async ({ page }) => {
  await gotoReady(page, '/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('main#main')).toBeFocused();
});

test('desktop navigation marks the current page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoReady(page, '/impact');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await expect(nav.getByRole('link', { name: 'Impact' })).toHaveAttribute('aria-current', 'page');
  await nav.getByRole('button', { name: 'What We Do' }).click();
  await nav.getByRole('link', { name: 'Campaigns' }).click();
  await expect(page).toHaveURL(/\/campaigns$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('asked for by the people who run it');
});

test('desktop dropdown works from the keyboard and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoReady(page, '/about');
  const nav = page.getByRole('navigation', { name: 'Main' });
  const trigger = nav.getByRole('button', { name: 'What We Do' });
  await trigger.focus();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const panelId = await trigger.getAttribute('aria-controls');
  expect(panelId).toBeTruthy();
  await page.keyboard.press('Tab');
  expect(await page.evaluate((id) => document.getElementById(id!)?.contains(document.activeElement), panelId)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
  // Enter toggles it open and shut again.
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('transparent home header keeps white text on a dark scrim at 240 px, then turns solid on scroll', async ({ page }) => {
  await page.setViewportSize({ width: 240, height: 844 });
  await gotoReady(page, '/');
  const header = page.locator('header').first();
  await expect(header).toHaveCSS('color', 'rgb(255, 255, 255)');
  expect(await header.evaluate((h) => getComputedStyle(h).backgroundImage)).toContain('linear-gradient');
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
  await expect(header).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});

test('mobile menu opens as a modal, traps focus, closes on Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page, '/');
  const button = page.getByRole('button', { name: 'Menu' });
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  await expect(dialog).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'true');

  // Focus starts inside and stays inside when tabbing past the end.
  for (let i = 0; i < 15; i++) await page.keyboard.press('Tab');
  expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(button).toBeFocused();
});

test('mobile menu link navigates and closes the menu', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await gotoReady(page, '/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('dialog').getByRole('link', { name: /Volunteer/ }).first().click();
  await expect(page).toHaveURL(/\/volunteer$/);
  await expect(page.getByRole('dialog')).toBeHidden();
});
