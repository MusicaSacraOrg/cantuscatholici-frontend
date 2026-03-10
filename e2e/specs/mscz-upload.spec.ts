import { test, expect } from '@playwright/test';
import { loginAsRedactor } from '../helpers/auth';

const REDACTOR_ID = 5;

test.describe('Phase 17: MuseScore File Upload', () => {
    test('Upload section visible in song create form', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/song/new/create`);

        await expect(page.getByText('Noty (MuseScore)')).toBeVisible();
        await expect(page.getByText('.mscz subor (povinne)')).toBeVisible();
        await expect(page.getByText('.svg subor (povinne)')).toBeVisible();
        await expect(page.getByText('.pdf subor (povinne)')).toBeVisible();
        await expect(page.getByText('.mp3 subor (volitelne)', { exact: true })).toBeVisible();
    });

    test('Song form has all required fields', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/song/new/create`);

        await expect(page.getByLabel('Názov')).toBeVisible();
        await expect(page.getByLabel('Autor')).toBeVisible();
        await expect(page.getByLabel('Popis')).toBeVisible();
        await expect(page.getByText('Tagy')).toBeVisible();
        await expect(page.getByText('Text piesne')).toBeVisible();
    });

    test('Lyrics part buttons add parts', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/song/new/create`);

        await page.getByRole('button', { name: '+ Sloha' }).click();
        await expect(page.getByPlaceholder('Text...')).toHaveCount(1);

        await page.getByRole('button', { name: '+ Refren' }).click();
        await expect(page.getByPlaceholder('Text...')).toHaveCount(2);
    });

    test('Author dropdown has options', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/song/new/create`);

        const authorSelect = page.getByRole('combobox', { name: 'Autor' });
        await expect(authorSelect).toBeVisible();
        const options = authorSelect.locator('option');
        // At least 1 disabled placeholder + 3 seed authors
        expect(await options.count()).toBeGreaterThanOrEqual(4);
    });
});
