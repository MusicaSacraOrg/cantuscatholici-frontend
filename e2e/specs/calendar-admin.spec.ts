import { test, expect } from '@playwright/test';
import { loginAsRedactor, getAuthToken, TEST_REDACTOR, apiRequest } from '../helpers/auth';

const REDACTOR_ID = 5;

test.describe('Phase 19: Calendar Admin Management', () => {
    test('View calendar entry list', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/calendar`);

        await expect(page.getByRole('heading', { name: 'Liturgicky kalendar' })).toBeVisible();
    });

    test('Month navigation works', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/calendar`);

        const monthLabel = page.getByText(/\w+ \d{4}/);
        const initialText = await monthLabel.textContent();

        await page.getByRole('button', { name: '<' }).click();
        await page.waitForTimeout(500);

        const newText = await monthLabel.textContent();
        expect(newText).not.toBe(initialText);
    });

    test('Create entry button navigates to form', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/calendar`);

        await page.getByRole('button', { name: 'Pridat zaznam' }).click();
        await page.waitForURL(/calendar\/new\/create/);
    });

    test('Create calendar entry via API', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const response = await apiRequest('POST', '/calendar/', token, {
            api_id: `e2e-test-entry-${Date.now()}`,
            title: 'E2E Test Calendar Entry',
            description: 'E2E test entry',
            date: '2026-12-25',
            feast_type: 'solemnity',
            liturgical_season: 'vianoce',
            is_recurring: true,
        });

        expect(response.status).toBeLessThan(400);
    });

    test('Add song to calendar entry via API', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);

        const entriesResp = await apiRequest('GET', '/calendar/?year=2026&month=12', token);
        const entries = await entriesResp.json();

        const songsResp = await apiRequest('GET', '/song/?limit=1', token);
        const songs = await songsResp.json();

        if (!entries.length || !songs.items?.length) return test.skip();

        const response = await apiRequest(
            'POST',
            `/calendar/${entries[0].id}/songs/${songs.items[0].id}`,
            token,
        );
        expect(response.status).toBeLessThan(400);
    });
});
