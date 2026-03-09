import { useState } from 'react';
import { useBem } from '@musica-sacra/hooks';
import { useParams } from 'react-router';
import { Loader } from '@musica-sacra/loader';
import { useEventDetail } from './useEventDetail';
import { ChevronIcon } from './ChevronIcon';
import {
    formatDate,
    getSortedTags,
    TAG_LETTERS,
    hasSongTitle,
} from './calendarViewUtils';

const EMPTY_SONGS_MESSAGE =
    'Pre toto slavenie nie sú aktuálne dostupné žiadne piesne.';
const SONG_UNAVAILABLE_MESSAGE =
    'Ľutujeme, detaily k piesni nie sú dostupné.';

/**
 * General info for one event: name, date, song list (expandable tags).
 * Used by EventDetail page. Kept as separate component so EventDetail can add more sections later.
 */
export function EventInfo() {
    const { bem } = useBem('view-calendar-event-info');
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading, isError } = useEventDetail(id);
    const [expandedSongIds, setExpandedSongIds] = useState<Set<string>>(new Set());

    if (!id) {
        return <div className={bem()}>Event ID is required.</div>;
    }

    if (isLoading) return <Loader />;
    if (isError || !event) {
        return <div className={bem()}>Event not found.</div>;
    }

    const mappedSongs = event.songs.filter(hasSongTitle);
    const hasMappedSongs = mappedSongs.length > 0;

    return (
        <div className={bem()}>
            <h1 className={bem('title')}>Detail slávenia</h1>
            <div className={bem('content')}>
                <aside className={bem('meta')}>
                    <h2 className={bem('meta-title')}>{event.name}</h2>
                    <p className={bem('meta-date')}>{formatDate(event.date, 'datum')}</p>
                </aside>
                <div className={bem('songs')}>
                    {!hasMappedSongs ? (
                        <p className={bem('songs-empty')}>
                            {EMPTY_SONGS_MESSAGE}
                        </p>
                    ) : (
                        <ol className={bem('song-list')}>
                            {mappedSongs.map((song) => {
                                const isSongExpanded =
                                    expandedSongIds.has(song.id);
                                const sortedTags =
                                    getSortedTags(song.tags);
                                const hasTagsToShow =
                                    sortedTags.length > 0;
                                const showUnavailableRollout =
                                    isSongExpanded && !hasTagsToShow;
                                const toggleSongExpanded = () => {
                                    setExpandedSongIds((prev) => {
                                        const next = new Set(prev);
                                        if (next.has(song.id)) next.delete(song.id);
                                        else next.add(song.id);
                                        return next;
                                    });
                                };
                                return (
                                    <li
                                        key={song.id}
                                        className={bem('song-item', {
                                            expanded: isSongExpanded,
                                        })}
                                    >
                                        <div className={bem('song-row')}>
                                            <button
                                                type="button"
                                                className={bem(
                                                    'song-title'
                                                )}
                                                onClick={toggleSongExpanded}
                                            >
                                                {song.title}
                                            </button>
                                            <span
                                                className={bem(
                                                    'song-author'
                                                )}
                                            >
                                                {song.author ?? ''}
                                            </span>
                                            <span
                                                className={bem(
                                                    'song-meta'
                                                )}
                                            >
                                                {song.hymnal ?? ''}
                                            </span>
                                            <button
                                                type="button"
                                                className={bem(
                                                    'song-chevron'
                                                )}
                                                onClick={toggleSongExpanded}
                                                aria-expanded={
                                                    isSongExpanded
                                                }
                                                aria-label={
                                                    isSongExpanded
                                                        ? 'Zbaliť'
                                                        : 'Rozbaliť'
                                                }
                                            >
                                                <ChevronIcon
                                                    direction={
                                                        isSongExpanded
                                                            ? 'up'
                                                            : 'down'
                                                    }
                                                    className={bem(
                                                        'song-chevron-icon'
                                                    )}
                                                    aria-hidden={true}
                                                />
                                            </button>
                                        </div>
                                        {isSongExpanded && hasTagsToShow && (
                                            <div
                                                className={bem(
                                                    'song-tags-rollout'
                                                )}
                                            >
                                                {sortedTags.map(
                                                    (tag, i) => (
                                                        <span
                                                            key={tag}
                                                            className={bem(
                                                                'song-tag'
                                                            )}
                                                        >
                                                            {TAG_LETTERS[i] ??
                                                                `${i + 1}.`}.{' '}
                                                            {tag}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}
                                        {showUnavailableRollout && (
                                            <div
                                                className={bem(
                                                    'song-unavailable-rollout'
                                                )}
                                                role="status"
                                            >
                                                <p
                                                    className={bem(
                                                        'song-unavailable-text'
                                                    )}
                                                >
                                                    {SONG_UNAVAILABLE_MESSAGE}
                                                </p>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}
