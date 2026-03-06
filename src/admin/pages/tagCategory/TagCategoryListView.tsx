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
import { TagCategoryEndpoints } from '../../../api/tag_category/TagCategoryEndpoints';

type TagCategoryRow = {
    id: string;
    name: string;
    color: string;
};

type TagCategoryResponse = {
    id: number;
    name: string;
    color: string;
};

type PaginatedResponse = {
    items: TagCategoryResponse[];
    total: number;
    limit: number;
    offset: number;
};

export function TagCategoryListView() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const { data, isLoading } = useQuery({
        queryKey: ['adminTagCategories'],
        queryFn: async () => {
            const response = await axios.get<PaginatedResponse>(
                TagCategoryEndpoints.getTagCategories(),
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
            await axios.delete(TagCategoryEndpoints.deleteTagCategory(id), {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTagCategories'] });
            queryClient.invalidateQueries({
                queryKey: ['tagCategoriesWithTags'],
            });
            addNotification(
                'Kategória bola vymazaná',
                NotificationTypes.SUCCESS
            );
        },
        onError: () => {
            addNotification(
                'Nepodarilo sa vymazať kategóriu',
                NotificationTypes.ERROR
            );
        },
    });

    const items: TagCategoryRow[] =
        data?.items.map((cat) => ({
            id: String(cat.id),
            name: cat.name,
            color: cat.color,
        })) ?? [];

    return (
        <Container>
            <h2>Kategórie tagov</h2>
            <Button
                accent
                onClick={() =>
                    navigate(`/dashboard/${userId}/tag-category/new/create`)
                }
            >
                Vytvoriť kategóriu
            </Button>
            <Loader loading={isLoading}>
                <Table
                    items={items}
                    columns={[
                        {
                            key: 'name',
                            label: 'Názov',
                            size: 'large',
                            isSortFilter: true,
                        },
                        {
                            key: 'color',
                            label: 'Farba',
                            size: 'medium',
                            isSortFilter: false,
                            render: (value: string) => (
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: 20,
                                        height: 20,
                                        backgroundColor: value,
                                        borderRadius: 4,
                                        verticalAlign: 'middle',
                                    }}
                                />
                            ),
                        },
                    ]}
                    onEdit={(item) =>
                        navigate(
                            `/dashboard/${userId}/tag-category/${item.id}/edit`
                        )
                    }
                    onDelete={(item) => deleteMutation.mutate(item.id)}
                />
            </Loader>
        </Container>
    );
}
