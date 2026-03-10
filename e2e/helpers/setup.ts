import { getAuthToken, TEST_REDACTOR, TEST_USER, TEST_ADMIN, apiRequest } from './auth';

const BASE_API = 'http://localhost:8000/api';

async function ensureTestUsers(): Promise<void> {
    for (const user of [TEST_USER, TEST_REDACTOR, TEST_ADMIN]) {
        try {
            await getAuthToken(user.email, user.password);
        } catch {
            console.log(`Test user ${user.email} not reachable. Run seed script in backend.`);
        }
    }
}

export async function globalSetup(): Promise<void> {
    console.log('E2E Setup: Verifying test users...');
    await ensureTestUsers();
    console.log('E2E Setup: Complete.');
}

export default globalSetup;
