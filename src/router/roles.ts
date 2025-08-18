export const Roles = Object.freeze({
    LOGGED_USER: 'loggedUser',
    REDACTOR: 'redactor',
    ADMIN: 'admin',
});

export type Role = (typeof Roles)[keyof typeof Roles];
