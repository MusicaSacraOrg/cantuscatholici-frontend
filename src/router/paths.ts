export const Paths = Object.freeze({
    HOMEPAGE: `/`,

    LOGIN: `/login`,
    REGISTER: `/register`,

    ABOUT: '/about-the-project',

    CALENDAR: '/calendar/*',

    SONG_DETAIL: '/song/:id/*',

    SONG_DETAIL_SHEETS: '/song/:id/sheets',
    SONG_DETAIL_HYMNOLOGY: '/song/:id/hymnology',
    SONG_DETAIL_EVENTS: '/song/:id/events',
    SONG_DETAIL_RELATED: '/song/:id/related',
    SONG_DETAIL_ARRANGEMENTS: '/song/:id/arrangements',
    SONG_DETAIL_ARRANGEMENTS_DETAIL: '/song/:id/arrangements/:arrangementId',

    USER_DETAIL: '/user/:id',

    ADMIN_HOME: '/dashboard/:userId/*',
    ADMIN_EDIT_PROFILE: '/dashboard/:userId/edit',
    ADMIN_RESET_PASSWORD: '/dashboard/:userId/reset-password',

    ADMIN_TAG_LIST: '/dashboard/:userId/tag',
    ADMIN_TAG_EDIT: '/dashboard/:userId/tag/:id/edit',
    ADMIN_TAG_DETAIL: '/dashboard/:userId/tag/:id/detail',
    ADMIN_TAG_CREATE: '/dashboard/:userId/tag/:id/create',

    ADMIN_TAG_CATEGORY_LIST: '/dashboard/:userId/tag-category',
    ADMIN_TAG_CATEGORY_EDIT: '/dashboard/:userId/tag-category/:id/edit',
    ADMIN_TAG_CATEGORY_DETAIL: '/dashboard/:userId/tag-category/:id/detail',
    ADMIN_TAG_CATEGORY_CREATE: '/dashboard/:userId/tag-category/:id/create',

    ADMIN_SONG_LIST: '/dashboard/:userId/song',
    ADMIN_SONG_EDIT: '/dashboard/:userId/song/:id/edit',
    ADMIN_SONG_DETAIL: '/dashboard/:userId/song/:id/detail',
    ADMIN_SONG_CREATE: '/dashboard/:userId/song/:id/create',
});
