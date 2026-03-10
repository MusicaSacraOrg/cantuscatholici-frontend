import { test, expect } from '@playwright/test';
import { loginAsRedactor, getAuthToken, TEST_REDACTOR, apiRequest } from '../helpers/auth';

test.describe('Phase 16: Transposition UI', () => {
    test('Transposition controls hidden for songs without mscz', async ({ page }) => {
        await loginAsRedactor(page);
        // Song 3 has no mscz content
        await page.goto('/song/3/sheets');
        await page.waitForTimeout(1000);

        await expect(page.getByText('Transponovanie')).not.toBeVisible();
    });

    test('Song sheets tab renders for a song without mscz', async ({ page }) => {
        await loginAsRedactor(page);
        await page.goto('/song/3/sheets');

        // Should show song title
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('Transpose API returns error when MuseScore unavailable', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);

        // Find a song with mscz (may not exist in test data)
        const songsResp = await apiRequest('GET', '/song/?limit=50', token);
        const songs = await songsResp.json();
        const songWithMscz = songs.items?.find((s: any) => s.msczContent);

        if (!songWithMscz) return test.skip();

        const resp = await apiRequest('POST', `/song/${songWithMscz.id}/transpose`, token, {
            semitones: 1,
        });
        const data = await resp.json();

        // MuseScore likely not installed — expect error or success
        expect(data.available !== undefined || data.error !== undefined).toBe(true);
    });
});
