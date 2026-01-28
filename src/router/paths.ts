export const Paths = Object.freeze({
    HOMEPAGE: `/`,

    LOGIN: `/login`,
    REGISTER: `/register`,

    ABOUT: '/about-the-project',

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
    // editacia piesni aj pre uzivatela, domysliet co moze a co nie
    // redaktor ma moznost pridavat oficialny obsah
    // v MVP by som asi obmedzil to co moze pridat bezny uzivatel

    // Editacia userov pre admina
    // upravovat, mazat, povysovat a ponizovat ucty

    // vymazat ucet a vsetok moj pridany content

    // reviews pre admina a redaktora
    // aprovovat uzivatelsky obsah, povysovat na oficialny

    // editacia uprav a medzihier

    // editacia eventov pre redaktora a admina
});
