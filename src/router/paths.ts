export const Paths = Object.freeze({
    HOMEPAGE: `/`,

    LOGIN: `/login`,
    REGISTER: `/register`,

    ABOUT: '/about-the-project',

    DOCS: '/docs',

    CALENDAR: '/calendar/*',

    SONG_DETAIL: '/song/:id/*',

    SONG_DETAIL_SHEETS: 'sheets',
    SONG_DETAIL_HYMNOLOGY: 'hymnology',
    SONG_DETAIL_EVENTS: 'events',
    SONG_DETAIL_RELATED: 'related',
    SONG_DETAIL_ARRANGEMENTS: 'arrangements',
    SONG_DETAIL_ARRANGEMENTS_DETAIL: 'arrangements/:arrangementId',

    USER_DETAIL: '/user/:id',

    ADMIN: '/dashboard/:userId/*',

    ADMIN_HOME: 'home',

    ADMIN_EDIT_PROFILE: 'edit',
    ADMIN_RESET_PASSWORD: 'reset-password',

    ADMIN_TAG_LIST: 'tag',
    ADMIN_TAG_EDIT: 'tag/:id/edit',
    ADMIN_TAG_DETAIL: 'tag/:id/detail',
    ADMIN_TAG_CREATE: 'tag/:id/create',

    ADMIN_TAG_CATEGORY_LIST: 'tag-category',
    ADMIN_TAG_CATEGORY_EDIT: 'tag-category/:id/edit',
    ADMIN_TAG_CATEGORY_DETAIL: 'tag-category/:id/detail',
    ADMIN_TAG_CATEGORY_CREATE: 'tag-category/:id/create',

    ADMIN_SONG_LIST: 'song',
    ADMIN_SONG_EDIT: 'song/:id/edit',
    ADMIN_SONG_DETAIL: 'song/:id/detail',
    ADMIN_SONG_CREATE: 'song/:id/create',

    ADMIN_REVIEW_LIST: 'review',
    ADMIN_REVIEW_DETAIL: 'review/:id/detail',

    ADMIN_CALENDAR_LIST: 'calendar',
    ADMIN_CALENDAR_EDIT: 'calendar/:id/edit',
    ADMIN_CALENDAR_CREATE: 'calendar/new/create',
});
