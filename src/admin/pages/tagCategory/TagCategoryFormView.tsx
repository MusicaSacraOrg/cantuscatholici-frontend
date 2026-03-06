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
import { TagCategoryEndpoints } from '../../../api/tag_category/TagCategoryEndpoints';

type TagCategoryResponse = {
    id: number;
    name: string;
    color: string;
};

export function TagCategoryFormView() {
    const navigate = useNavigate();
    const { userId, id } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const isEdit = id !== undefined && id !== 'new';

    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    const { data, isLoading } = useQuery({
        queryKey: ['adminTagCategory', id],
        queryFn: async () => {
            const response = await axios.get<TagCategoryResponse>(
                TagCategoryEndpoints.getTagCategory(id!)
            );
            return response.data;
        },
        enabled: isEdit,
    });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setColor(data.color);
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const body = { name, color };

            if (isEdit) {
                await axios.put(
                    TagCategoryEndpoints.updateTagCategory(id!),
                    body,
                    { headers }
                );
            } else {
                await axios.post(
                    TagCategoryEndpoints.createTagCategory(),
                    body,
                    { headers }
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTagCategories'] });
            queryClient.invalidateQueries({
                queryKey: ['tagCategoriesWithTags'],
            });
            addNotification(
                isEdit
                    ? 'Kategória bola upravená'
                    : 'Kategória bola vytvorená',
                NotificationTypes.SUCCESS
            );
            navigate(`/dashboard/${userId}/tag-category`);
        },
        onError: () => {
            addNotification(
                isEdit
                    ? 'Nepodarilo sa upraviť kategóriu'
                    : 'Nepodarilo sa vytvoriť kategóriu',
                NotificationTypes.ERROR
            );
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveMutation.mutate();
    };

    if (isEdit && isLoading) {
        return (
            <Container>
                <Loader loading />
            </Container>
        );
    }

    return (
        <Container>
            <h2>
                {isEdit ? 'Upraviť kategóriu' : 'Vytvoriť kategóriu'}
            </h2>
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
                            <Label htmlFor="color">Farba</Label>
                            <Input
                                id="color"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                required
                            />
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
