import { Page } from '@playwright/test';

const BASE_API = 'http://localhost:8000/api';

export const TEST_USER = {
    email: 'user@test.com',
    password: 'TestPass123!',
};

export const TEST_REDACTOR = {
    email: 'redactor@test.com',
    password: 'TestPass123!',
};

export const TEST_ADMIN = {
    email: 'admin@test.com',
    password: 'TestPass123!',
};

export async function getAuthToken(email: string, password: string): Promise<string> {
    const response = await fetch(`${BASE_API}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password }),
    });
    if (!response.ok) {
        throw new Error(`Login failed for ${email}: ${response.status}`);
    }
    const data = await response.json();
    return data.accessToken;
}

export async function loginViaAPI(page: Page, email: string, password: string): Promise<void> {
    const token = await getAuthToken(email, password);
    await page.goto('/');
    await page.evaluate((t) => localStorage.setItem('token', t), token);
}

export async function loginViaUI(page: Page, email: string, password: string): Promise<void> {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Heslo' }).fill(password);
    await page.getByRole('button', { name: 'Prihlásiť sa' }).click();
    await page.waitForURL(/dashboard/, { timeout: 10000 });
}

export async function loginAsRedactor(page: Page): Promise<void> {
    await loginViaAPI(page, TEST_REDACTOR.email, TEST_REDACTOR.password);
}

export async function loginAsUser(page: Page): Promise<void> {
    await loginViaAPI(page, TEST_USER.email, TEST_USER.password);
}

export async function loginAsAdmin(page: Page): Promise<void> {
    await loginViaAPI(page, TEST_ADMIN.email, TEST_ADMIN.password);
}

export async function apiRequest(
    method: string,
    path: string,
    token: string,
    body?: Record<string, unknown>,
): Promise<Response> {
    const options: RequestInit = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    return fetch(`${BASE_API}${path}`, options);
}
