import { useBem } from '@musica-sacra/hooks';
import { SongListItem } from './SongListItem';
import { Hr } from '../hr/Hr';
import { useGetList } from '@musica-sacra/api';
import { Loader } from '@musica-sacra/loader';

export function SongList() {
    const { bem } = useBem('song-list');

    const { query } = useGetList('mocks/songs.json', 'songs');

    return (
        <div className={bem()}>
            <div className={bem('songs')}>
                <Loader loading={query.isLoading}>
                    {query.data?.items?.map((song) => (
                        <>
                            <SongListItem key={song.id} song={song} />
                            <Hr />
                        </>
                    ))}
                </Loader>
            </div>
        </div>
    );
}
