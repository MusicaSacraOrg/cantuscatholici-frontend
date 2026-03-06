import { useContext } from 'react';
import { SongContext } from '../SongView';
import { useBem } from '@musica-sacra/hooks';
import { Link } from 'react-router';

export function RelatedTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('related-tab');

    if (!song) return null;

    return (
        <div className={bem()}>
            <h2>Súvisiace piesne</h2>
            {song.relatedSong ? (
                <Link to={`/song/${song.relatedSong.id}/sheets`}>
                    {song.relatedSong.title}
                </Link>
            ) : (
                <p>Žiadne súvisiace piesne.</p>
            )}
        </div>
    );
}
