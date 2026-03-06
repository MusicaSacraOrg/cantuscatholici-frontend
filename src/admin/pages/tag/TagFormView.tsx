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
import { TagEndpoints } from '../../../api/tag/TagEndpoints';
import { TagCategoryEndpoints } from '../../../api/tag_category/TagCategoryEndpoints';

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

type PaginatedResponse = {
    items: TagCategoryResponse[];
    total: number;
    limit: number;
    offset: number;
};

export function TagFormView() {
    const navigate = useNavigate();
    const { userId, id } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const isEdit = id !== undefined && id !== 'new';

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState<number | ''>('');

    const { data: tagData, isLoading: tagLoading } = useQuery({
        queryKey: ['adminTag', id],
        queryFn: async () => {
            const response = await axios.get<TagResponse>(
                TagEndpoints.getTag(id!)
            );
            return response.data;
        },
        enabled: isEdit,
    });

    const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: ['adminTagCategoriesForForm'],
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

    useEffect(() => {
        if (tagData) {
            setName(tagData.name);
            setCategoryId(tagData.categoryId);
        }
    }, [tagData]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const body = { name, categoryId };

            if (isEdit) {
                await axios.put(TagEndpoints.updateTag(id!), body, {
                    headers,
                });
            } else {
                await axios.post(TagEndpoints.createTag(), body, { headers });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTags'] });
            queryClient.invalidateQueries({
                queryKey: ['tagCategoriesWithTags'],
            });
            addNotification(
                isEdit ? 'Tag bol upravený' : 'Tag bol vytvorený',
                NotificationTypes.SUCCESS
            );
            navigate(`/dashboard/${userId}/tag`);
        },
        onError: () => {
            addNotification(
                isEdit
                    ? 'Nepodarilo sa upraviť tag'
                    : 'Nepodarilo sa vytvoriť tag',
                NotificationTypes.ERROR
            );
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveMutation.mutate();
    };

    if ((isEdit && tagLoading) || categoriesLoading) {
        return (
            <Container>
                <Loader loading />
            </Container>
        );
    }

    return (
        <Container>
            <h2>{isEdit ? 'Upraviť tag' : 'Vytvoriť tag'}</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormGroup>
                        <InputGroup>
                            <Label htmlFor="name">Názov</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="categoryId">Kategória</Label>
                            <select
                                id="categoryId"
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(Number(e.target.value))
                                }
                                required
                            >
                                <option value="" disabled>
                                    Vyberte kategóriu
                                </option>
                                {categoriesData?.items.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </InputGroup>
                    </FormGroup>
                    <Button accent type="submit" disabled={saveMutation.isPending}>
                        {isEdit ? 'Uložiť' : 'Vytvoriť'}
                    </Button>
                </FormContent>
            </form>
        </Container>
    );
}
