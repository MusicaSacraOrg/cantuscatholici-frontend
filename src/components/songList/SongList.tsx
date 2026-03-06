import { useBem } from '@musica-sacra/hooks';
import { SongListItem } from './SongListItem';
import { Hr } from '../hr/Hr';
import { useGetList } from '@musica-sacra/api';
import { Loader } from '@musica-sacra/loader';
import { useUrlParams } from '../../views/homepageView/useUrlParams';
import { SongEndpoints } from '../../api/song/SongEndpoints';
import { Song } from '../../models/song';

export function SongList() {
    const { bem } = useBem('song-list');
    const { getParams, setParams } = useUrlParams();

    const params = getParams();

    const queryParams: Record<string, string> = {};
    if (params.tags) queryParams.tags = params.tags;
    if (params.searchQuery) queryParams.search = params.searchQuery;
    if (params.sort) queryParams.sort = params.sort;
    if (params.direction) queryParams.direction = params.direction;

    const offset = params.offset ? parseInt(params.offset) : 0;
    queryParams.offset = String(offset);
    queryParams.limit = params.limit || '10';

    const { query } = useGetList<Song>(
        SongEndpoints.getSongs(),
        'songs',
        queryParams,
    );

    const total = (query.data as Record<string, unknown>)?.total as
        | number
        | undefined;
    const limit = parseInt(queryParams.limit);
    const hasNext = total !== undefined && offset + limit < total;
    const hasPrev = offset > 0;

    const goNext = () => {
        setParams({ offset: offset + limit });
    };

    const goPrev = () => {
        setParams({ offset: Math.max(0, offset - limit) });
    };

    return (
        <div className={bem()}>
            <div className={bem('songs')}>
                <Loader loading={query.isLoading}>
                    {query.data?.items?.map((song: Song) => (
                        <div key={song.id}>
                            <SongListItem song={song} />
                            <Hr />
                        </div>
                    ))}
                    {query.data?.items?.length === 0 && (
                        <p>Nenašli sa žiadne piesne.</p>
                    )}
                </Loader>
            </div>
            {(hasPrev || hasNext) && (
                <div className={bem('pagination')}>
                    <button onClick={goPrev} disabled={!hasPrev}>
                        Predchádzajúce
                    </button>
                    <button onClick={goNext} disabled={!hasNext}>
                        Nasledujúce
                    </button>
                </div>
            )}
        </div>
    );
}
