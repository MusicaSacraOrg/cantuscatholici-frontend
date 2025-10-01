const baseUrl = 'http://localhost:8000';

export const EndpointsObject = Object.freeze({
    // Test
    TEST: `${baseUrl}/`,

    USER_LOGIN: `${baseUrl}/api/user/login`,
    USER_REGISTER: `${baseUrl}/api/user/register`,

    USER: `${baseUrl}/api/user/`,

    TAGS: `${baseUrl}/api/tags/`,
});

export class Endpoints {
    static readonly baseUrl = 'http://localhost:8000';
}
