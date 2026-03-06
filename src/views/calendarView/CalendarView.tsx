import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';
import { Loader } from '@musica-sacra/loader';
import { Endpoints } from '../../api/Endpoints';
import { NavLink } from 'react-router';

type CalendarSong = {
    id: number;
    title: string;
};

type CalendarEntry = {
    id: number;
    apiId: string;
    title?: string;
    description?: string;
    date?: string;
    feastType?: string;
    liturgicalSeason?: string;
    isRecurring: boolean;
    songs: CalendarSong[];
};

const MONTHS = [
    'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Jun',
    'Jul', 'August', 'September', 'Oktober', 'November', 'December',
];

export function CalendarView() {
    const { bem } = useBem('view-calendar');
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);

    const { data: entries, isLoading } = useQuery({
        queryKey: ['calendar', year, month],
        queryFn: async () => {
            const response = await axios.get<CalendarEntry[]>(
                `${Endpoints.baseUrl}/api/calendar/`,
                { params: { year, month } }
            );
            return response.data;
        },
    });

    const { data: todayEntries } = useQuery({
        queryKey: ['calendarToday'],
        queryFn: async () => {
            const response = await axios.get<CalendarEntry[]>(
                `${Endpoints.baseUrl}/api/calendar/today`
            );
            return response.data;
        },
    });

    const sidebar = (
        <div style={{ padding: '16px' }}>
            <h3>Dnes</h3>
            {todayEntries && todayEntries.length > 0 ? (
                todayEntries.map((e) => (
                    <div key={e.id} style={{ marginBottom: '8px' }}>
                        <strong>{e.title}</strong>
                        {e.songs.map((s) => (
                            <div key={s.id}>
                                <NavLink to={`/song/${s.id}/sheets`}>
                                    {s.title}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p style={{ color: '#888' }}>Ziadne slavenia dnes.</p>
            )}
        </div>
    );

    return (
        <Queen isPageLayout={true} sidebar={sidebar} className={bem()}>
            <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                    <button type="button" onClick={() => { if (month === 1) { setMonth(12); setYear(year - 1); } else setMonth(month - 1); }}>
                        &lt;
                    </button>
                    <h2>{MONTHS[month - 1]} {year}</h2>
                    <button type="button" onClick={() => { if (month === 12) { setMonth(1); setYear(year + 1); } else setMonth(month + 1); }}>
                        &gt;
                    </button>
                </div>

                <Loader loading={isLoading}>
                    {entries && entries.length > 0 ? (
                        <div>
                            {entries.map((entry) => (
                                <div
                                    key={entry.id}
                                    style={{
                                        border: '1px solid #eee',
                                        padding: '12px',
                                        marginBottom: '8px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{entry.title || entry.apiId}</strong>
                                        {entry.date && (
                                            <span style={{ color: '#666' }}>
                                                {new Date(entry.date).toLocaleDateString('sk-SK')}
                                            </span>
                                        )}
                                    </div>
                                    {entry.feastType && (
                                        <span
                                            style={{
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
                                        <p style={{ margin: '4px 0', color: '#666' }}>
                                            {entry.description}
                                        </p>
                                    )}
                                    {entry.songs.length > 0 && (
                                        <div style={{ marginTop: '8px' }}>
                                            {entry.songs.map((s) => (
                                                <NavLink
                                                    key={s.id}
                                                    to={`/song/${s.id}/sheets`}
                                                    style={{ display: 'block', marginTop: '4px' }}
                                                >
                                                    {s.title}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>
                            Ziadne slavenia v tomto mesiaci.
                        </p>
                    )}
                </Loader>
            </div>
        </Queen>
    );
}
