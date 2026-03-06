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
import { TagEndpoints } from '../../../api/tag/TagEndpoints';
import { TagCategoryEndpoints } from '../../../api/tag_category/TagCategoryEndpoints';

type TagRow = {
    id: string;
    name: string;
    categoryName: string;
};

type TagResponse = {
    id: number;
    name: string;
    categoryId: number;
};

type TagCategoryResponse = {
    id: number;
    name: string;
    color: string;
};

type PaginatedResponse<T> = {
    items: T[];
    total: number;
    limit: number;
    offset: number;
};

export function TagListView() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const { data: tagsData, isLoading: tagsLoading } = useQuery({
        queryKey: ['adminTags'],
        queryFn: async () => {
            const response = await axios.get<PaginatedResponse<TagResponse>>(
                TagEndpoints.getTags(),
                {
                    params: { limit: 100, offset: 0 },
                }
            );
            return response.data;
        },
    });

    const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: ['adminTagCategoriesForTags'],
        queryFn: async () => {
            const response = await axios.get<
                PaginatedResponse<TagCategoryResponse>
            >(TagCategoryEndpoints.getTagCategories(), {
                params: { limit: 100, offset: 0 },
            });
            return response.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token');
            await axios.delete(TagEndpoints.deleteTag(id), {
                headers: { Authorization: `Bearer ${token}` },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTags'] });
            queryClient.invalidateQueries({
                queryKey: ['tagCategoriesWithTags'],
            });
            addNotification('Tag bol vymazaný', NotificationTypes.SUCCESS);
        },
        onError: () => {
            addNotification(
                'Nepodarilo sa vymazať tag',
                NotificationTypes.ERROR
            );
        },
    });

    const categoryMap = new Map(
        categoriesData?.items.map((cat) => [cat.id, cat.name]) ?? []
    );

    const items: TagRow[] =
        tagsData?.items.map((tag) => ({
            id: String(tag.id),
            name: tag.name,
            categoryName: categoryMap.get(tag.categoryId) ?? '—',
        })) ?? [];

    const isLoading = tagsLoading || categoriesLoading;

    return (
        <Container>
            <h2>Tagy</h2>
            <Button
                accent
                onClick={() =>
                    navigate(`/dashboard/${userId}/tag/new/create`)
                }
            >
                Vytvoriť tag
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
                            key: 'categoryName',
                            label: 'Kategória',
                            size: 'medium',
                            isSortFilter: true,
                        },
                    ]}
                    onEdit={(item) =>
                        navigate(
                            `/dashboard/${userId}/tag/${item.id}/edit`
                        )
                    }
                    onDelete={(item) => deleteMutation.mutate(item.id)}
                />
            </Loader>
        </Container>
    );
}
