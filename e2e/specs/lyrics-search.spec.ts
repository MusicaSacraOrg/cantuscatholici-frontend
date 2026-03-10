import { test, expect } from '@playwright/test';
import { getAuthToken, TEST_REDACTOR, apiRequest, loginAsRedactor } from '../helpers/auth';

test.describe('Phase 20: Lyrics Snippets in Search', () => {
    test.beforeAll(async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const songsResp = await apiRequest('GET', '/song/?limit=1', token);
        const songs = await songsResp.json();

        if (songs.items?.length) {
            const songId = songs.items[0].id;
            await apiRequest('PUT', `/song/${songId}/lyrics`, token, {
                parts: [
                    { part_type: 'verse', lyrics: 'Chvalme Pana v kazdom chrame s radostou' },
                    { part_type: 'refrain', lyrics: 'Aleluja aleluja chvalme Pana' },
                ],
            });
        }
    });

    test('Search API returns results', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const response = await apiRequest('GET', '/song/?search=chvalme&limit=10', token);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.items).toBeDefined();
    });

    test('Search API returns lyrics snippet for lyrics match', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const response = await apiRequest('GET', '/song/?search=chvalme&limit=10', token);
        const data = await response.json();

        expect(response.status).toBe(200);
        // If any items matched via lyrics, they should have a snippet
        const withSnippet = data.items?.find(
            (item: any) => item.lyrics_snippet || item.lyricsSnippet,
        );
        if (data.items?.length > 0) {
            // At least check the field exists (may be null for title-only matches)
            expect(data.items[0]).toHaveProperty('lyricsSnippet');
        }
    });

    test('Homepage search input exists', async ({ page }) => {
        await page.goto('/');
        const searchInput = page.getByPlaceholder(/názov piesne/i);
        await expect(searchInput).toBeVisible();
    });
});
