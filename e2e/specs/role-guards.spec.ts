import { test, expect } from '@playwright/test';
import { getAuthToken, TEST_USER, TEST_REDACTOR, apiRequest } from '../helpers/auth';

test.describe('Phase 18: Role-Based Access Control', () => {
    test('Regular user cannot create songs via API', async () => {
        const token = await getAuthToken(TEST_USER.email, TEST_USER.password);
        const response = await apiRequest('POST', '/song/', token, {
            title: 'Unauthorized Song',
            author_id: 1,
            tag_ids: [],
        });
        expect(response.status).toBe(403);
    });

    test('Redactor can create songs via API', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);

        const personsResp = await apiRequest('GET', '/person/?limit=1', token);
        const persons = await personsResp.json();
        if (!persons.items?.length) return test.skip();

        const response = await apiRequest('POST', '/song/', token, {
            title: `E2E Test Song ${Date.now()}`,
            author_id: persons.items[0].id,
            description: 'Test song',
            tag_ids: [],
        });
        expect(response.status).toBeLessThan(400);
    });

    test('Regular user cannot approve reviews via API', async () => {
        const redactorToken = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const reviewsResp = await apiRequest('GET', '/review/', redactorToken);
        const reviews = await reviewsResp.json();
        if (!reviews.length) return test.skip();

        const userToken = await getAuthToken(TEST_USER.email, TEST_USER.password);
        const response = await apiRequest('POST', `/review/${reviews[0].id}/approve`, userToken);
        expect(response.status).toBe(403);
    });

    test('Regular user cannot create calendar entries via API', async () => {
        const token = await getAuthToken(TEST_USER.email, TEST_USER.password);
        const response = await apiRequest('POST', '/calendar/', token, {
            title: 'Unauthorized Entry',
            date: '2026-12-25',
        });
        expect(response.status).toBe(403);
    });

    test('Regular user cannot update songs via API', async () => {
        const token = await getAuthToken(TEST_USER.email, TEST_USER.password);
        const response = await apiRequest('PUT', '/song/3', token, {
            title: 'Updated by regular user',
            author_id: 1,
            tag_ids: [],
        });
        expect(response.status).toBe(403);
    });

    test('Redactor can access review endpoints', async () => {
        const token = await getAuthToken(TEST_REDACTOR.email, TEST_REDACTOR.password);
        const response = await apiRequest('GET', '/review/', token);
        expect(response.status).toBe(200);
    });
});
