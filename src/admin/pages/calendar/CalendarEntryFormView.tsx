import { Container } from '@musica-sacra/layout';
import {
    Button,
    FormContent,
    FormGroup,
    Input,
    InputGroup,
    Label,
} from '@musica-sacra/forms';
import { Loader } from '@musica-sacra/loader';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState, FormEvent } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import axios from 'axios';
import { CalendarEndpoints } from '../../../api/calendar/CalendarEndpoints';
import { SongEndpoints } from '../../../api/song/SongEndpoints';

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

type SongResponse = {
    id: number;
    title: string;
};

type PaginatedResponse<T> = {
    items: T[];
    total: number;
    limit: number;
    offset: number;
};

export function CalendarEntryFormView() {
    const navigate = useNavigate();
    const { userId, id } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const isEdit = id !== undefined && id !== 'new';

    const [apiId, setApiId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [feastType, setFeastType] = useState('');
    const [liturgicalSeason, setLiturgicalSeason] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [songSearch, setSongSearch] = useState('');
    const [linkedSongs, setLinkedSongs] = useState<CalendarSong[]>([]);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const { data: entryData, isLoading: entryLoading } = useQuery({
        queryKey: ['adminCalendarEntry', id],
        queryFn: async () => {
            const entries = await axios.get<CalendarEntryResponse[]>(
                CalendarEndpoints.getEntries(),
                { headers }
            );
            return entries.data.find((e) => String(e.id) === id) ?? null;
        },
        enabled: isEdit,
    });

    const { data: songsData } = useQuery({
        queryKey: ['adminSongsForCalendar', songSearch],
        queryFn: async () => {
            const response = await axios.get<PaginatedResponse<SongResponse>>(
                SongEndpoints.getSongs(),
                { params: { limit: 20, offset: 0, search: songSearch || undefined } }
            );
            return response.data;
        },
    });

    useEffect(() => {
        if (entryData) {
            setApiId(entryData.api_id);
            setTitle(entryData.title ?? '');
            setDescription(entryData.description ?? '');
            setDate(entryData.date ?? '');
            setFeastType(entryData.feast_type ?? '');
            setLiturgicalSeason(entryData.liturgical_season ?? '');
            setIsRecurring(entryData.is_recurring);
            setLinkedSongs(entryData.songs ?? []);
        }
    }, [entryData]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const body: Record<string, unknown> = {
                title: title || null,
                description: description || null,
                date: date || null,
                feast_type: feastType || null,
                liturgical_season: liturgicalSeason || null,
            };

            if (isEdit) {
                await axios.put(
                    CalendarEndpoints.updateEntry(id!),
                    body,
                    { headers }
                );
            } else {
                await axios.post(
                    CalendarEndpoints.createEntry(),
                    { ...body, api_id: apiId, is_recurring: isRecurring },
                    { headers }
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminCalendarEntries'] });
            addNotification(
                isEdit ? 'Zaznam bol upraveny' : 'Zaznam bol vytvoreny',
                NotificationTypes.SUCCESS
            );
            navigate(`/dashboard/${userId}/calendar`);
        },
        onError: () => {
            addNotification(
                isEdit ? 'Nepodarilo sa upravit zaznam' : 'Nepodarilo sa vytvorit zaznam',
                NotificationTypes.ERROR
            );
        },
    });

    const addSongMutation = useMutation({
        mutationFn: async (songId: number) => {
            await axios.post(
                CalendarEndpoints.addSongToEntry(id!, songId),
                {},
                { headers }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminCalendarEntry', id] });
            addNotification('Piesen bola pridana', NotificationTypes.SUCCESS);
        },
        onError: () => {
            addNotification('Nepodarilo sa pridat piesen', NotificationTypes.ERROR);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveMutation.mutate();
    };

    if (isEdit && entryLoading) {
        return (
            <Container>
                <Loader loading />
            </Container>
        );
    }

    const linkedSongIds = new Set(linkedSongs.map((s) => s.id));

    return (
        <Container>
            <h2>{isEdit ? 'Upravit zaznam kalendara' : 'Vytvorit zaznam kalendara'}</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormGroup>
                        {!isEdit && (
                            <InputGroup>
                                <Label htmlFor="apiId">API ID</Label>
                                <Input
                                    id="apiId"
                                    value={apiId}
                                    onChange={(e) => setApiId(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        )}
                        <InputGroup>
                            <Label htmlFor="title">Nazov</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="description">Popis</Label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="date">Datum</Label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="feastType">Typ sviatku</Label>
                            <Input
                                id="feastType"
                                value={feastType}
                                onChange={(e) => setFeastType(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="liturgicalSeason">Liturgicke obdobie</Label>
                            <Input
                                id="liturgicalSeason"
                                value={liturgicalSeason}
                                onChange={(e) => setLiturgicalSeason(e.target.value)}
                            />
                        </InputGroup>
                        {!isEdit && (
                            <InputGroup>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="checkbox"
                                        checked={isRecurring}
                                        onChange={(e) => setIsRecurring(e.target.checked)}
                                    />
                                    Opakujuci sa (kazdy rok)
                                </label>
                            </InputGroup>
                        )}
                    </FormGroup>
                    <Button
                        accent
                        type="submit"
                        disabled={saveMutation.isPending}
                    >
                        {isEdit ? 'Ulozit' : 'Vytvorit'}
                    </Button>
                </FormContent>
            </form>

            {isEdit && (
                <div style={{ marginTop: '32px' }}>
                    <h3>Priradene piesne</h3>
                    {linkedSongs.length > 0 ? (
                        <ul>
                            {linkedSongs.map((song) => (
                                <li key={song.id}>{song.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>
                            Ziadne priradene piesne.
                        </p>
                    )}

                    <h4 style={{ marginTop: '16px' }}>Pridat piesen</h4>
                    <input
                        type="text"
                        value={songSearch}
                        onChange={(e) => setSongSearch(e.target.value)}
                        placeholder="Hladat piesne..."
                        style={{ padding: '6px', marginBottom: '8px', width: '100%' }}
                    />
                    {songsData?.items
                        .filter((s) => !linkedSongIds.has(s.id))
                        .map((song) => (
                            <div
                                key={song.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '6px 0',
                                    borderBottom: '1px solid #eee',
                                }}
                            >
                                <span>{song.title}</span>
                                <button
                                    type="button"
                                    onClick={() => addSongMutation.mutate(song.id)}
                                    disabled={addSongMutation.isPending}
                                    style={{ cursor: 'pointer', padding: '4px 12px' }}
                                >
                                    + Pridat
                                </button>
                            </div>
                        ))}
                </div>
            )}
        </Container>
    );
}
