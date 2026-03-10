import { Container } from '@musica-sacra/layout';
import { Table } from '../../../components/table/Table';
import { Button } from '@musica-sacra/forms';
import { Loader } from '@musica-sacra/loader';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { CalendarEndpoints } from '../../../api/calendar/CalendarEndpoints';

type CalendarEntryRow = {
    id: string;
    title: string;
    date: string;
    feastType: string;
    songCount: string;
};

type CalendarSong = {
    id: number;
    title: string;
};

type CalendarEntryResponse = {
    id: number;
    api_id: string;
    title?: string;
    description?: string;
    date?: string;
    feast_type?: string;
    liturgical_season?: string;
    is_recurring: boolean;
    songs: CalendarSong[];
};

const MONTHS = [
    'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Jun',
    'Jul', 'August', 'September', 'Oktober', 'November', 'December',
];

export function CalendarListView() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);

    const { data, isLoading } = useQuery({
        queryKey: ['adminCalendarEntries', year, month],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get<CalendarEntryResponse[]>(
                CalendarEndpoints.getEntries(),
                {
                    params: { year, month },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        },
    });

    const items: CalendarEntryRow[] =
        data?.map((entry) => ({
            id: String(entry.id),
            title: entry.title || entry.api_id,
            date: entry.date
                ? new Date(entry.date).toLocaleDateString('sk-SK')
                : '—',
            feastType: entry.feast_type || '—',
            songCount: String(entry.songs?.length ?? 0),
        })) ?? [];

    return (
        <Container>
            <h2>Liturgicky kalendar</h2>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                <button
                    type="button"
                    onClick={() => {
                        if (month === 1) { setMonth(12); setYear(year - 1); }
                        else setMonth(month - 1);
                    }}
                >
                    &lt;
                </button>
                <span style={{ fontWeight: 'bold' }}>{MONTHS[month - 1]} {year}</span>
                <button
                    type="button"
                    onClick={() => {
                        if (month === 12) { setMonth(1); setYear(year + 1); }
                        else setMonth(month + 1);
                    }}
                >
                    &gt;
                </button>
            </div>

            <Button
                accent
                onClick={() =>
                    navigate(`/dashboard/${userId}/calendar/new/create`)
                }
            >
                Pridat zaznam
            </Button>

            <Loader loading={isLoading}>
                <Table
                    items={items}
                    columns={[
                        {
                            key: 'title',
                            label: 'Nazov',
                            size: 'large',
                            isSortFilter: true,
                        },
                        {
                            key: 'date',
                            label: 'Datum',
                            size: 'medium',
                            isSortFilter: true,
                        },
                        {
                            key: 'feastType',
                            label: 'Typ sviatku',
                            size: 'medium',
                            isSortFilter: true,
                        },
                        {
                            key: 'songCount',
                            label: 'Piesne',
                            size: 'small',
                            isSortFilter: false,
                        },
                    ]}
                    onEdit={(item) =>
                        navigate(
                            `/dashboard/${userId}/calendar/${item.id}/edit`
                        )
                    }
                />
            </Loader>
        </Container>
    );
}
