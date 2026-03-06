import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SongContext } from '../SongView';
import { SongEndpoints } from '../../../api/song/SongEndpoints';
import { StaticContentEndpoints } from '../../../api/staticContent/StaticContentEndpoints';
import { SongLyrics } from '../../../models/song';
import { useBem } from '@musica-sacra/hooks';
import { Loader } from '@musica-sacra/loader';

function getPartLabel(partType: string, verseNumber: number): string {
    if (partType === 'verse') {
        return `${verseNumber}.`;
    }
    if (partType === 'refrain') {
        return 'R:';
    }
    return partType;
}

export function SheetsTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('sheets-tab');
    const [svgExpanded, setSvgExpanded] = useState(false);

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

    const svgFileId = song?.msczContent?.svgUrl?.split('/').pop();
    const { data: svgContent } = useQuery({
        queryKey: ['svgContent', svgFileId],
        queryFn: async () => {
            const response = await axios.get(
                StaticContentEndpoints.getFile(svgFileId!),
                { responseType: 'text' }
            );
            return response.data as string;
        },
        enabled: !!svgFileId,
    });

    if (!song) return null;

    const msczContent = song.msczContent;

    return (
        <div className={bem()}>
            <h1>{song.title}</h1>
            {song.authorName && (
                <p className={bem('author')}>{song.authorName}</p>
            )}

            {msczContent && (
                <div className={bem('downloads')}>
                    {msczContent.pdfUrl && (
                        <a
                            href={StaticContentEndpoints.getFile(
                                msczContent.pdfUrl.split('/').pop()!
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={bem('download-btn')}
                        >
                            PDF
                        </a>
                    )}
                    {msczContent.svgUrl && (
                        <a
                            href={StaticContentEndpoints.getFile(
                                msczContent.svgUrl.split('/').pop()!
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={bem('download-btn')}
                        >
                            SVG
                        </a>
                    )}
                </div>
            )}

            {svgContent && (
                <div className={bem('svg-container', { expanded: svgExpanded })}>
                    <button
                        type="button"
                        className={bem('svg-toggle')}
                        onClick={() => setSvgExpanded(!svgExpanded)}
                    >
                        {svgExpanded ? 'Zmensiť noty' : 'Zväčšiť noty'}
                    </button>
                    <div
                        className={bem('svg-viewer')}
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                </div>
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
                    !svgContent && (
                        <div className={bem('placeholder')}>
                            <p>Text piesne zatial nie je dostupny.</p>
                        </div>
                    )
                )}
            </Loader>
        </div>
    );
}
