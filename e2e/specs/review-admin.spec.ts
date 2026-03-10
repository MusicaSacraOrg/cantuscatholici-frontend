import { test, expect } from '@playwright/test';
import { loginAsRedactor, loginAsUser, getAuthToken, TEST_REDACTOR, TEST_USER, apiRequest } from '../helpers/auth';

const REDACTOR_ID = 5;

test.describe('Phase 15: Admin Review Management', () => {
    test('View review list as redactor', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/review`);
        await expect(page.getByRole('heading', { name: 'Recenzie' })).toBeVisible();
    });

    test('Status filter tabs are visible and clickable', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/review`);

        await expect(page.getByRole('button', { name: 'Vsetky' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Otvorene' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Schvalene' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Zamietnute' })).toBeVisible();

        await page.getByRole('button', { name: 'Otvorene' }).click();
        await page.waitForTimeout(500);
    });

    test('Review detail shows approve/reject for open review', async ({ page }) => {
        const userToken = await getAuthToken(TEST_USER.email, TEST_USER.password);
        const redactorToken = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);

        // Get a song
        const songsResp = await apiRequest('GET', '/song/?limit=1', redactorToken);
        const songs = await songsResp.json();
        if (!songs.items?.length) return test.skip();
        const songId = songs.items[0].id;

        // Submit user content to auto-create review
        await apiRequest('POST', `/song/${songId}/content`, userToken, {
            title: 'E2E test arrangement',
            content_type: 'predohra',
        });

        // Get open reviews
        const reviewsResp = await apiRequest('GET', '/review/?status=open', redactorToken);
        const reviews = await reviewsResp.json();
        if (!reviews.length) return test.skip();

        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/review/${reviews[0].id}/detail`);

        await expect(page.getByRole('heading', { name: /Recenzia/ })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Schvalit' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Zamietnut' })).toBeVisible();
    });

    test('Comment form visible on review detail', async ({ page }) => {
        const redactorToken = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const reviewsResp = await apiRequest('GET', '/review/', redactorToken);
        const reviews = await reviewsResp.json();
        if (!reviews.length) return test.skip();

        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/review/${reviews[0].id}/detail`);

        await expect(page.getByPlaceholder('Napisat komentar')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Pridat komentar' })).toBeVisible();
    });

    test('Approve a review changes status', async ({ page }) => {
        const redactorToken = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const reviewsResp = await apiRequest('GET', '/review/?status=open', redactorToken);
        const reviews = await reviewsResp.json();
        if (!reviews.length) return test.skip();

        await loginAsRedactor(page);
        await page.goto(`/dashboard/${REDACTOR_ID}/review/${reviews[0].id}/detail`);
        await page.getByRole('button', { name: 'Schvalit' }).click();

        await expect(page.getByText('Schvalene')).toBeVisible({ timeout: 5000 });
    });
});
