import { useBem } from '@musica-sacra/hooks';
import { SongListItem } from './SongListItem';
import { Hr } from '../hr/Hr';

const songs = [
    {
        id: '1',
        title: 'Ty si Pane v kazdom chrame',
        author: 'Mikulas Schneider-Trnavsky',
        hymnalNumber: '257',
        hymnal: 'JKS',
        tags: ['Introit', 'Offertorium'],
    },
    {
        id: '2',
        title: 'Nejaky super duper dlhy nazov lorem ipsum a kadeco este Ty si Pane v kazdom chrame',
        author: 'Mikulas Schneider-Trnavsky',
        hymnal: 'JKS',
    },
    {
        id: '3',
        title: 'Lorem ipsum',
        author: '',
        hymnalNumber: '257',
        hymnal: 'JKS a daky dlhy nazov spevnika',
        tags: ['Introit', 'Offertorium'],
    },
    {
        id: '1',
        title: 'Ty si Pane v kazdom chrame',
        author: 'Mikulas Schneider-Trnavsky',
    },
];

export function SongList() {
    const { bem } = useBem('song-list');

    return (
        <div className={bem()}>
            <div className={bem('songs')}>
                {songs.map((song) => (
                    <>
                        <SongListItem key={song.id} song={song} />
                        <Hr />
                    </>
                ))}
            </div>
        </div>
    );
}
