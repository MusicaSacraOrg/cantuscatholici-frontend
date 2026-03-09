import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

/** Query keys for event detail. Use for invalidation (e.g. queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEYS.detail(id) })). */
export const EVENT_QUERY_KEYS = {
    detail: (id: string | undefined) => ['eventDetail', id] as const,
    details: (ids: string[]) => ['eventDetails', ids.filter(Boolean).sort().join(',')] as const,
};

export type EventSong = {
    id: string;
    title: string;
    /** Enriched from songs.json. */
    author?: string;
    /** Songbook code (e.g. JKS). Enriched from songs.json. */
    hymnal?: string;
    /** E.g. Introit, Offertorium. Enriched from songs.json, shown sorted. */
    tags?: string[];
    songPart: number | null;
    songPartName: string | null;
    prescribed: boolean;
    eventPart: string;
};

export type EventDetailData = {
    id: number;
    name: string;
    description?: string;
    date: { day: number; month: number } | null;
    songs: EventSong[];
};

/** Raw shape from event.json: id, eventPart, optional prescribed/songPart/songPartName. */
type EventSongStub = {
    id: string;
    songPart: number | null;
    songPartName: string | null;
    prescribed: boolean;
    eventPart: string;
};

type EventDetailRaw = Omit<EventDetailData, 'songs'> & {
    songs: EventSongStub[];
};

type EventByIdResponse = Record<string, EventDetailRaw>;

type SongsListResponse = {
    items: Array<{ id: string; title?: string; author?: string; hymnal?: string; tags?: string[] }>;
};

function mergeEventWithSongs(
    event: EventDetailRaw,
    songsMap: Record<string, SongsListResponse['items'][number]>
): EventDetailData {
    const mergedSongs: EventSong[] = event.songs.map((es) => {
        const song = songsMap[es.id];
        return {
            ...es,
            title: song?.title ?? '',
            author: song?.author ?? '',
            hymnal: song?.hymnal ?? '',
            tags: song?.tags ?? [],
        };
    });
    return { ...event, songs: mergedSongs };
}

async function fetchEventDetails(
    ids: string[]
): Promise<Record<string, EventDetailData | null>> {
    const [eventRes, songsRes] = await Promise.all([
        axios.get<EventByIdResponse>('/mocks/event.json'),
        axios.get<SongsListResponse>('/mocks/songs.json'),
    ]);
    const events = eventRes.data ?? {};
    const songsList = songsRes.data?.items ?? [];
    const songsMap = Object.fromEntries(songsList.map((s) => [s.id, s]));

    const result: Record<string, EventDetailData | null> = {};
    for (const id of ids) {
        const event = events[id] ?? null;
        result[id] = event ? mergeEventWithSongs(event, songsMap) : null;
    }
    return result;
}

export function useEventDetail(id: string | undefined) {
    const query = useQuery({
        queryKey: EVENT_QUERY_KEYS.detail(id),
        queryFn: async (): Promise<EventDetailData | null> => {
            if (id == null) return null;
            const map = await fetchEventDetails([id]);
            return map[id] ?? null;
        },
        enabled: id != null,
    });

    return {
        ...query,
        data: query.data ?? null,
    };
}

/** Details for multiple event ids. Uses keepPreviousData so expanding another row does not clear existing data. */
export function useEventDetails(ids: string[]) {
    const sortedIds = [...ids].filter(Boolean).sort();
    const query = useQuery({
        queryKey: EVENT_QUERY_KEYS.details(ids),
        placeholderData: keepPreviousData,
        queryFn: () => fetchEventDetails(sortedIds),
        enabled: sortedIds.length > 0,
    });

    return {
        ...query,
        data: query.data ?? {},
    };
}
