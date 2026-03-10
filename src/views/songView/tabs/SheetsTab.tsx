import { useContext, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SongContext } from '../SongView';
import { SongEndpoints } from '../../../api/song/SongEndpoints';
import { StaticContentEndpoints } from '../../../api/staticContent/StaticContentEndpoints';
import { TranspositionEndpoints } from '../../../api/transposition/TranspositionEndpoints';
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
    const [transposition, setTransposition] = useState(0);
    const [transposedSvg, setTransposedSvg] = useState<string | null>(null);
    const [transposeError, setTransposeError] = useState<string | null>(null);

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

    const transposeMutation = useMutation({
        mutationFn: async (semitones: number) => {
            const token = localStorage.getItem('token');
            const headers = token
                ? { Authorization: `Bearer ${token}` }
                : undefined;
            const response = await axios.post(
                TranspositionEndpoints.transpose(song!.id),
                { semitones },
                { headers }
            );
            return response.data;
        },
        onSuccess: (data) => {
            setTransposeError(null);
            if (data.svg_url) {
                const fileId = data.svg_url.split('/').pop();
                axios
                    .get(StaticContentEndpoints.getFile(fileId), {
                        responseType: 'text',
                    })
                    .then((resp) => setTransposedSvg(resp.data));
            }
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setTransposeError('Transponovanie vyžaduje prihlásenie.');
                    return;
                }

                const backendError = error.response?.data?.error;
                if (typeof backendError === 'string' && backendError.trim()) {
                    setTransposeError(
                        `Transponovanie zlyhalo: ${backendError}`
                    );
                    return;
                }
            }

            setTransposeError('Transponovanie zlyhalo.');
        },
    });

    const handleTranspose = (delta: number) => {
        const newVal = transposition + delta;
        setTransposition(newVal);
        if (newVal === 0) {
            setTransposedSvg(null);
            setTransposeError(null);
        } else {
            transposeMutation.mutate(newVal);
        }
    };

    if (!song) return null;

    const msczContent = song.msczContent;
    const displaySvg = transposedSvg || svgContent;

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

            {msczContent && (
                <div
                    className={bem('transposition')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                    }}
                >
                    <span style={{ fontWeight: 'bold' }}>Transponovanie:</span>
                    <button
                        type="button"
                        onClick={() => handleTranspose(-1)}
                        disabled={transposeMutation.isPending}
                        style={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        -
                    </button>
                    <span>
                        {transposition === 0
                            ? 'Original'
                            : `${transposition > 0 ? '+' : ''}${transposition} ${Math.abs(transposition) === 1 ? 'polton' : 'poltony'}`}
                    </span>
                    <button
                        type="button"
                        onClick={() => handleTranspose(1)}
                        disabled={transposeMutation.isPending}
                        style={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        +
                    </button>
                    {transposeMutation.isPending && (
                        <span style={{ color: '#888', fontStyle: 'italic' }}>
                            Transponujem...
                        </span>
                    )}
                </div>
            )}

            {transposeError && (
                <p style={{ color: '#d9534f', marginBottom: '12px' }}>
                    {transposeError}
                </p>
            )}

            {displaySvg && (
                <div
                    className={bem('svg-container', { expanded: svgExpanded })}
                >
                    <button
                        type="button"
                        className={bem('svg-toggle')}
                        onClick={() => setSvgExpanded(!svgExpanded)}
                    >
                        {svgExpanded ? 'Zmensit noty' : 'Zvacsit noty'}
                    </button>
                    <div
                        className={bem('svg-viewer')}
                        dangerouslySetInnerHTML={{ __html: displaySvg }}
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
                                    className={bem('part', {
                                        [part.partType]: true,
                                    })}
                                >
                                    <span className={bem('part-label')}>
                                        {getPartLabel(
                                            part.partType,
                                            verseCount
                                        )}
                                    </span>
                                    <pre className={bem('part-text')}>
                                        {part.lyrics}
                                    </pre>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    !displaySvg && (
                        <div className={bem('placeholder')}>
                            <p>Text piesne zatial nie je dostupny.</p>
                        </div>
                    )
                )}
            </Loader>
        </div>
    );
}
