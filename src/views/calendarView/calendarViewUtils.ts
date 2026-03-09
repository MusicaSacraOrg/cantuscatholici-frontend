/** Formats event date (dd.mm.). emptyLabel when date is null (e.g. 'Datum' in list, 'datum' in meta). */
export function formatDate(
    date: { day: number; month: number } | null,
    emptyLabel: string = 'Datum'
): string {
    if (!date) return emptyLabel;
    return `${String(date.day).padStart(2, '0')}.${String(date.month).padStart(2, '0')}.`;
}

/** Tags sorted alphabetically (lowercase). Used with TAG_LETTERS for a. b. c. labels. */
export function getSortedTags(tags: string[] | undefined): string[] {
    if (!tags?.length) return [];
    return [...tags].sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
    );
}

export const TAG_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

/** True when song has a non-empty title. Use to filter displayable songs. */
export function hasSongTitle(song: { title?: string | null }): boolean {
    return song.title != null && song.title !== '';
}
