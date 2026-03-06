import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SongContext } from '../SongView';
import { Endpoints } from '../../../api/Endpoints';
import { useBem } from '@musica-sacra/hooks';
import { Loader } from '@musica-sacra/loader';

type CalendarEntryItem = {
    id: number;
    title?: string;
    description?: string;
    date?: string;
    feastType?: string;
    liturgicalSeason?: string;
};

export function EventsTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('events-tab');

    const { data, isLoading } = useQuery({
        queryKey: ['songCalendar', song?.id],
        queryFn: async () => {
            const response = await axios.get<CalendarEntryItem[]>(
                `${Endpoints.baseUrl}/api/calendar/song/${song!.id}`
            );
            return response.data;
        },
        enabled: !!song?.id,
    });

    if (!song) return null;

    return (
        <div className={bem()}>
            <h2>Slavenia</h2>
            <Loader loading={isLoading}>
                {data && data.length > 0 ? (
                    <div>
                        {data.map((entry) => (
                            <div
                                key={entry.id}
                                style={{
                                    border: '1px solid #eee',
                                    padding: '12px',
                                    marginBottom: '8px',
                                    borderRadius: '4px',
                                }}
                            >
                                <strong>{entry.title || 'Bez nazvu'}</strong>
                                {entry.date && (
                                    <span style={{ marginLeft: '8px', color: '#666' }}>
                                        {new Date(entry.date).toLocaleDateString('sk-SK')}
                                    </span>
                                )}
                                {entry.feastType && (
                                    <span
                                        style={{
                                            marginLeft: '8px',
                                            padding: '2px 8px',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '4px',
                                            fontSize: '0.85em',
                                        }}
                                    >
                                        {entry.feastType}
                                    </span>
                                )}
                                {entry.description && (
                                    <p style={{ margin: '4px 0 0', color: '#666' }}>
                                        {entry.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#888', fontStyle: 'italic' }}>
                        Tato piesen zatial nie je priradena k ziadnemu slaveniu.
                    </p>
                )}
            </Loader>
        </div>
    );
}
