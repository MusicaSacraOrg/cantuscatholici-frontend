import { test, expect } from '@playwright/test';
import { TEST_REDACTOR } from '../helpers/auth';

test.describe('Login Flow', () => {
    test('Login page renders correctly', async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByRole('heading', { name: 'Prihlásenie' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Heslo' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Prihlásiť sa' })).toBeVisible();
    });

    test('Login with valid credentials redirects to dashboard', async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('textbox', { name: 'Email' }).fill(TEST_REDACTOR.email);
        await page.getByRole('textbox', { name: 'Heslo' }).fill(TEST_REDACTOR.password);
        await page.getByRole('button', { name: 'Prihlásiť sa' }).click();

        await page.waitForURL(/dashboard/, { timeout: 10000 });
        expect(page.url()).toContain('/dashboard/');
    });

    test('Dashboard shows user info after login', async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('textbox', { name: 'Email' }).fill(TEST_REDACTOR.email);
        await page.getByRole('textbox', { name: 'Heslo' }).fill(TEST_REDACTOR.password);
        await page.getByRole('button', { name: 'Prihlásiť sa' }).click();

        await page.waitForURL(/dashboard/, { timeout: 10000 });
        await expect(page.getByText('Test Redactor')).toBeVisible();
        await expect(page.getByText('Redactor', { exact: true })).toBeVisible();
    });
});
