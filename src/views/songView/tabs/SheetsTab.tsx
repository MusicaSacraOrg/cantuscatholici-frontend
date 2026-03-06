import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SongContext } from '../SongView';
import { SongEndpoints } from '../../../api/song/SongEndpoints';
import { SongLyrics } from '../../../models/song';
import { useBem } from '@musica-sacra/hooks';
import { Loader } from '@musica-sacra/loader';

const PART_TYPE_LABELS: Record<string, string> = {
    verse: 'Sloha',
    refrain: 'Refren',
    bridge: 'Bridge',
    coda: 'Koda',
    intro: 'Intro',
};

function getPartLabel(partType: string, verseNumber: number): string {
    if (partType === 'verse') {
        return `${verseNumber}.`;
    }
    if (partType === 'refrain') {
        return 'R:';
    }
    return PART_TYPE_LABELS[partType] || partType;
}

export function SheetsTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('sheets-tab');

    const { data: lyrics, isLoading } = useQuery({
        queryKey: ['songLyrics', song?.id],
        queryFn: async () => {
            const response = await axios.get<SongLyrics>(
                SongEndpoints.getSongLyrics(song!.id)
            );
            return response.data;
        },
        enabled: !!song?.id,
    });

    if (!song) return null;

    return (
        <div className={bem()}>
            <h1>{song.title}</h1>
            {song.authorName && (
                <p className={bem('author')}>{song.authorName}</p>
            )}
            <Loader loading={isLoading}>
                {lyrics && lyrics.parts.length > 0 ? (
                    <div className={bem('lyrics')}>
                        {lyrics.parts.map((part, index) => {
                            const verseCount = lyrics.parts
                                .slice(0, index + 1)
                                .filter((p) => p.partType === 'verse').length;

                            return (
                                <div
                                    key={index}
                                    className={bem('part', { [part.partType]: true })}
                                >
                                    <span className={bem('part-label')}>
                                        {getPartLabel(part.partType, verseCount)}
                                    </span>
                                    <pre className={bem('part-text')}>
                                        {part.lyrics}
                                    </pre>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={bem('placeholder')}>
                        <p>Text piesne zatial nie je dostupny.</p>
                    </div>
                )}
            </Loader>
        </div>
    );
}
