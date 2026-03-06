import { Container } from '@musica-sacra/layout';
import { Table } from '../../../components/table/Table';
import { Button } from '@musica-sacra/forms';
import { Loader } from '@musica-sacra/loader';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import axios from 'axios';
import { SongEndpoints } from '../../../api/song/SongEndpoints';

type SongListItem = {
    id: number;
    title: string;
    authorName: string | null;
    tags: { id: number; name: string; categoryColor: string }[];
    description: string | null;
};

type PaginatedResponse<T> = {
    items: T[];
    total: number;
    limit: number;
    offset: number;
};

type SongRow = {
    id: string;
    title: string;
    authorName: string;
    tagCount: string;
};

export function SongListView() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const { data: songsData, isLoading } = useQuery({
        queryKey: ['adminSongs'],
        queryFn: async () => {
            const response = await axios.get<PaginatedResponse<SongListItem>>(
                SongEndpoints.getSongs(),
                {
                    params: { limit: 100, offset: 0 },
                }
            );
            return response.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token');
            await axios.delete(SongEndpoints.deleteSong(id), {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminSongs'] });
            addNotification('Pieseň bola vymazaná', NotificationTypes.SUCCESS);
        },
        onError: () => {
            addNotification(
                'Nepodarilo sa vymazať pieseň',
                NotificationTypes.ERROR
            );
        },
    });

    const items: SongRow[] =
        songsData?.items.map((song) => ({
            id: String(song.id),
            title: song.title,
            authorName: song.authorName ?? '—',
            tagCount: String(song.tags.length),
        })) ?? [];

    return (
        <Container>
            <h2>Piesne</h2>
            <Button
                accent
                onClick={() =>
                    navigate(`/dashboard/${userId}/song/new/create`)
                }
            >
                Vytvoriť pieseň
            </Button>
            <Loader loading={isLoading}>
                <Table
                    items={items}
                    columns={[
                        {
                            key: 'title',
                            label: 'Názov',
                            size: 'large',
                            isSortFilter: true,
                        },
                        {
                            key: 'authorName',
                            label: 'Autor',
                            size: 'medium',
                            isSortFilter: true,
                        },
                        {
                            key: 'tagCount',
                            label: 'Tagy',
                            size: 'small',
                            isSortFilter: false,
                        },
                    ]}
                    onEdit={(item) =>
                        navigate(
                            `/dashboard/${userId}/song/${item.id}/edit`
                        )
                    }
                    onDelete={(item) => deleteMutation.mutate(item.id)}
                />
            </Loader>
        </Container>
    );
}
