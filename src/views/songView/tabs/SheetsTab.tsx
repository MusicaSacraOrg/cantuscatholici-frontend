import { useContext } from 'react';
import { SongContext } from '../SongView';
import { useBem } from '@musica-sacra/hooks';

export function SheetsTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('sheets-tab');

    if (!song) return null;

    return (
        <div className={bem()}>
            <h1>{song.title}</h1>
            {song.authorName && (
                <p className={bem('author')}>{song.authorName}</p>
            )}
            <div className={bem('placeholder')}>
                <p>Noty a text budú dostupné čoskoro.</p>
            </div>
        </div>
    );
}
