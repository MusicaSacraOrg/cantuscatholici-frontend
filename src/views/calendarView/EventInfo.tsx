import { useState } from 'react';
import { useBem } from '@musica-sacra/hooks';
import { useParams } from 'react-router';
import { Loader } from '@musica-sacra/loader';
import { useEventDetail } from './useEventDetail';
import type { EventSong } from './useEventDetail';
import { ChevronIcon } from './ChevronIcon';
import {
    formatDate,
    getSortedTags,
    TAG_LETTERS,
    hasSongTitle,
} from './calendarViewUtils';

const EMPTY_SONGS_MESSAGE =
    'Pre toto slavenie nie sú aktuálne dostupné žiadne piesne.';
const SONG_UNAVAILABLE_MESSAGE = 'Ľutujeme, detaily k piesni nie sú dostupné.';

/** Display order for event parts (Introit, Zalm, Offertorium, Zaver). */
const EVENT_PART_ORDER = ['Introit', 'Zalm', 'Offertorium', 'Zaver'] as const;

/** Label for song part (stanza/block), e.g. "1. sloha", "piata sloha". */
function getSongPartLabel(song: EventSong): string {
    if (song.songPartName?.trim()) return song.songPartName;
    if (song.songPart != null) return `${song.songPart}. sloha`;
    return '';
}

function groupSongsByEventPart(songs: EventSong[]): Map<string, EventSong[]> {
    const map = new Map<string, EventSong[]>();
    for (const song of songs) {
        const part = song.eventPart || 'Ostatné';
        const list = map.get(part);
        if (list) list.push(song);
        else map.set(part, [song]);
    }
    return map;
}

/**
 * General info for one event: name, description, date, then songs grouped by part (Introit, Offertorium, Zaver).
 * Used by EventDetail page. Kept as separate component so EventDetail can add more sections later.
 */
export function EventInfo() {
    const { bem } = useBem('view-calendar-event-info');
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading, isError } = useEventDetail(id);
    const [expandedSongIds, setExpandedSongIds] = useState<Set<string>>(
        new Set()
    );

    if (!id) {
        return <div className={bem()}>Event ID is required.</div>;
    }

    if (isLoading) return <Loader />;
    if (isError || !event) {
        return <div className={bem()}>Event not found.</div>;
    }

    const mappedSongs = event.songs.filter(hasSongTitle);
    const hasMappedSongs = mappedSongs.length > 0;
    const songsByPart = groupSongsByEventPart(mappedSongs);

    return (
        <div className={bem()}>
            <header className={bem('header')}>
                <h1 className={bem('event-title')}>{event.name}</h1>
                {event.description != null && event.description !== '' && (
                    <p className={bem('description')}>{event.description}</p>
                )}
                <p className={bem('date')}>{formatDate(event.date, 'datum')}</p>
                <div className={bem('placeholder')} aria-hidden>
                    {/* Placeholder for future meta */}
                </div>
            </header>

            {!hasMappedSongs ? (
                <p className={bem('songs-empty')}>{EMPTY_SONGS_MESSAGE}</p>
            ) : (
                <div className={bem('parts')}>
                    {EVENT_PART_ORDER.map((partName) => {
                        const partSongs = songsByPart.get(partName);
                        if (!partSongs?.length) return null;
                        return (
                            <section
                                key={partName}
                                className={bem('part-section')}
                                aria-labelledby={`event-info-part-${partName}`}
                            >
                                <h2
                                    id={`event-info-part-${partName}`}
                                    className={bem('part-heading')}
                                >
                                    {partName}:
                                </h2>
                                <ul className={bem('part-song-list')}>
                                    {partSongs.map((song) => (
                                        <EventInfoSongItem
                                            key={song.id}
                                            song={song}
                                            bem={bem}
                                            expandedSongIds={expandedSongIds}
                                            setExpandedSongIds={
                                                setExpandedSongIds
                                            }
                                        />
                                    ))}
                                </ul>
                            </section>
                        );
                    })}
                    {/* Any part not in EVENT_PART_ORDER (e.g. custom parts) */}
                    {Array.from(songsByPart.entries()).map(
                        ([partName, partSongs]) => {
                            if (
                                EVENT_PART_ORDER.includes(
                                    partName as (typeof EVENT_PART_ORDER)[number]
                                )
                            )
                                return null;
                            return (
                                <section
                                    key={partName}
                                    className={bem('part-section')}
                                    aria-labelledby={`event-info-part-${partName}`}
                                >
                                    <h2
                                        id={`event-info-part-${partName}`}
                                        className={bem('part-heading')}
                                    >
                                        {partName}:
                                    </h2>
                                    <ul className={bem('part-song-list')}>
                                        {partSongs.map((song) => (
                                            <EventInfoSongItem
                                                key={song.id}
                                                song={song}
                                                bem={bem}
                                                expandedSongIds={
                                                    expandedSongIds
                                                }
                                                setExpandedSongIds={
                                                    setExpandedSongIds
                                                }
                                            />
                                        ))}
                                    </ul>
                                </section>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}

type EventInfoSongItemProps = {
    song: EventSong;
    bem: ReturnType<typeof useBem>['bem'];
    expandedSongIds: Set<string>;
    setExpandedSongIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

function EventInfoSongItem({
    song,
    bem,
    expandedSongIds,
    setExpandedSongIds,
}: EventInfoSongItemProps) {
    const isSongExpanded = expandedSongIds.has(song.id);
    const sortedTags = getSortedTags(song.tags);
    const hasTagsToShow = sortedTags.length > 0;
    const showUnavailableRollout = isSongExpanded && !hasTagsToShow;
    const partLabel = getSongPartLabel(song);
    const titleLine =
        partLabel !== '' ? `${song.title} - ${partLabel}` : song.title;

    const toggleSongExpanded = () => {
        setExpandedSongIds((prev) => {
            const next = new Set(prev);
            if (next.has(song.id)) next.delete(song.id);
            else next.add(song.id);
            return next;
        });
    };

    return (
        <li className={bem('song-item', { expanded: isSongExpanded })}>
            <div className={bem('song-row')}>
                <button
                    type="button"
                    className={bem('song-title')}
                    onClick={toggleSongExpanded}
                >
                    {titleLine}
                </button>
                <span className={bem('song-author')}>{song.author ?? ''}</span>
                <span className={bem('song-meta')}>{song.hymnal ?? ''}</span>
                <button
                    type="button"
                    className={bem('song-chevron')}
                    onClick={toggleSongExpanded}
                    aria-expanded={isSongExpanded}
                    aria-label={isSongExpanded ? 'Zbaliť' : 'Rozbaliť'}
                >
                    <ChevronIcon
                        direction={isSongExpanded ? 'up' : 'down'}
                        className={bem('song-chevron-icon')}
                        aria-hidden={true}
                    />
                </button>
            </div>
            {isSongExpanded && hasTagsToShow && (
                <div className={bem('song-tags-rollout')}>
                    {sortedTags.map((tag, i) => (
                        <span key={tag} className={bem('song-tag')}>
                            {TAG_LETTERS[i] ?? `${i + 1}.`}. {tag}
                        </span>
                    ))}
                </div>
            )}
            {showUnavailableRollout && (
                <div className={bem('song-unavailable-rollout')} role="status">
                    <p className={bem('song-unavailable-text')}>
                        {SONG_UNAVAILABLE_MESSAGE}
                    </p>
                </div>
            )}
        </li>
    );
}
