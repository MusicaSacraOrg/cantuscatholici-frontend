export const Roles = Object.freeze({
    USER: 'User',
    REDACTOR: 'Redactor',
    ADMIN: 'Admin',
});

export type Role = (typeof Roles)[keyof typeof Roles];
