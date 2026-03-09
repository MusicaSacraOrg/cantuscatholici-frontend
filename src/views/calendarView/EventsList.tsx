import { useState } from 'react';
import { useBem } from '@musica-sacra/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from '@musica-sacra/loader';
import { useSearchParams } from 'react-router';
import { useEventDetails } from './useEventDetail';
import type { EventDetailData, EventSong } from './useEventDetail';
import { ChevronIcon } from './ChevronIcon';
import {
    formatDate,
    getSortedTags,
    TAG_LETTERS,
    hasSongTitle,
} from './calendarViewUtils';

type EventItem = {
    id: number;
    name: string;
    description?: string;
    date: { day: number; month: number } | null;
};

type EventCategoryDetailResponse = Record<string, { items: EventItem[] }>;

type BemFn = ReturnType<typeof useBem>['bem'];

type EventDetailContentProps = {
    eventId: number;
    eventDetail: EventDetailData;
    expandedSongKeys: Set<string>;
    toggleSongExpanded: (eventId: number, songId: string) => void;
    bem: BemFn;
};

const EMPTY_SONGS_MESSAGE =
    'Pre toto slavenie nie sú aktuálne dostupné žiadne piesne.';
const SONG_UNAVAILABLE_MESSAGE =
    'Ľutujeme, detaily k piesni nie sú dostupné.';

function EventDetailContent({
    eventId,
    eventDetail,
    expandedSongKeys,
    toggleSongExpanded,
    bem,
}: EventDetailContentProps) {
    const mappedSongs = eventDetail.songs.filter(hasSongTitle);
    if (mappedSongs.length === 0) {
        return (
            <p className={bem('item-detail-empty')}>
                {EMPTY_SONGS_MESSAGE}
            </p>
        );
    }
    return (
        <div className={bem('item-detail-songs')}>
            <ol className={bem('item-detail-song-list')}>
                {mappedSongs.map((song) => (
                    <EventSongRow
                        key={song.id}
                        song={song}
                        eventId={eventId}
                        expandedSongKeys={expandedSongKeys}
                        toggleSongExpanded={toggleSongExpanded}
                        bem={bem}
                    />
                ))}
            </ol>
        </div>
    );
}

type EventSongRowProps = {
    song: EventSong;
    eventId: number;
    expandedSongKeys: Set<string>;
    toggleSongExpanded: (eventId: number, songId: string) => void;
    bem: BemFn;
};

function EventSongRow({
    song,
    eventId,
    expandedSongKeys,
    toggleSongExpanded,
    bem,
}: EventSongRowProps) {
    const songKey = `${eventId}-${song.id}`;
    const isSongExpanded = expandedSongKeys.has(songKey);
    const sortedTags = getSortedTags(song.tags);
    const hasTagsToShow = sortedTags.length > 0;
    const showUnavailableRollout = isSongExpanded && !hasTagsToShow;
    const onToggle = () => toggleSongExpanded(eventId, song.id);

    return (
        <li
            className={bem('item-detail-song', { expanded: isSongExpanded })}
        >
            <div className={bem('item-detail-song-row')}>
                <button
                    type="button"
                    className={bem('item-detail-song-title')}
                    onClick={onToggle}
                >
                    {song.title}
                </button>
                <span className={bem('item-detail-song-author')}>
                    {song.author ?? ''}
                </span>
                <span className={bem('item-detail-song-meta')}>
                    {song.hymnal ?? ''}
                </span>
                <button
                    type="button"
                    className={bem('item-detail-song-chevron')}
                    onClick={onToggle}
                    aria-expanded={isSongExpanded}
                    aria-label={isSongExpanded ? 'Zbaliť' : 'Rozbaliť'}
                >
                    <ChevronIcon
                        direction={isSongExpanded ? 'up' : 'down'}
                        className={bem('item-detail-song-chevron-icon')}
                        aria-hidden={true}
                    />
                </button>
            </div>
            {isSongExpanded && hasTagsToShow && (
                <div className={bem('item-detail-song-tags-rollout')}>
                    {sortedTags.map((tag, i) => (
                        <span key={tag} className={bem('item-detail-song-tag')}>
                            {TAG_LETTERS[i] ?? `${i + 1}.`}. {tag}
                        </span>
                    ))}
                </div>
            )}
            {showUnavailableRollout && (
                <div
                    className={bem('item-detail-song-unavailable-rollout')}
                    role="status"
                >
                    <p className={bem('item-detail-song-unavailable-text')}>
                        {SONG_UNAVAILABLE_MESSAGE}
                    </p>
                </div>
            )}
        </li>
    );
}

export function EventsList() {
    const { bem } = useBem('view-calendar-events');
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category');
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
    const [expandedSongKeys, setExpandedSongKeys] = useState<Set<string>>(new Set());

    const { data, isLoading } = useQuery({
        queryKey: ['eventCategoryDetail'],
        queryFn: async (): Promise<EventCategoryDetailResponse> => {
            const { data: res } = await axios.get<EventCategoryDetailResponse>(
                '/mocks/eventCategoryDetail.json'
            );
            return res ?? {};
        },
    });

    const expandedIdList = Array.from(expandedIds);
    const { data: detailsMap, isLoading: detailLoading } = useEventDetails(
        expandedIdList.map(String)
    );

    const items = categoryId != null ? (data?.[categoryId]?.items ?? []) : [];

    const handleRowClick = (id: number) => {
        setExpandedIds((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleSongExpanded = (eventId: number, songId: string) => {
        const key = `${eventId}-${songId}`;
        setExpandedSongKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    return (
        <div className={bem()}>
            <h1 className={bem('title')}>Kalendar - slávenia</h1>
            {categoryId == null ? (
                <p className={bem('hint')}>Vyberte kategóriu v menu vľavo.</p>
            ) : (
                <Loader loading={isLoading}>
                    <ol className={bem('list')}>
                        {items.map((event, index) => {
                            const isExpanded = expandedIds.has(event.id);
                            const eventDetail = detailsMap[String(event.id)] ?? null;
                            return (
                                <li key={event.id} className={bem('item', { expanded: isExpanded })}>
                                    <div className={bem('item-row')}>
                                        <span className={bem('item-number')}>{index + 1}.</span>
                                        <div className={bem('item-body')}>
                                            <button
                                                type="button"
                                                className={bem('item-title')}
                                                onClick={() => handleRowClick(event.id)}
                                                aria-expanded={isExpanded}
                                                aria-controls={`event-detail-${event.id}`}
                                            >
                                                {event.name}
                                            </button>
                                            {event.description != null &&
                                                event.description !== '' && (
                                                    <span className={bem('item-description')}>
                                                        {event.description}
                                                    </span>
                                                )}
                                        </div>
                                        <span className={bem('item-date')}>
                                            {formatDate(event.date)}
                                        </span>
                                        <button
                                            type="button"
                                            className={bem('item-chevron')}
                                            onClick={() => handleRowClick(event.id)}
                                            aria-label={isExpanded ? 'Zbaliť' : 'Rozbaliť'}
                                            aria-expanded={isExpanded}
                                        >
                                            <ChevronIcon
                                                direction={isExpanded ? 'up' : 'down'}
                                                className={bem('item-chevron-icon')}
                                                aria-hidden={true}
                                            />
                                        </button>
                                    </div>
                                    {isExpanded && (
                                        <div
                                            id={`event-detail-${event.id}`}
                                            className={bem('item-detail')}
                                            role="region"
                                            aria-label={`Detail: ${event.name}`}
                                        >
                                            {isExpanded && detailLoading && !eventDetail ? (
                                                <Loader key={`loader-${event.id}`} />
                                            ) : eventDetail ? (
                                                <EventDetailContent
                                                    eventId={event.id}
                                                    eventDetail={eventDetail}
                                                    expandedSongKeys={expandedSongKeys}
                                                    toggleSongExpanded={toggleSongExpanded}
                                                    bem={bem}
                                                />
                                            ) : (
                                                <p className={bem('item-detail-error')}>Detail sa nenašiel.</p>
                                            )}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </Loader>
            )}
        </div>
    );
}
