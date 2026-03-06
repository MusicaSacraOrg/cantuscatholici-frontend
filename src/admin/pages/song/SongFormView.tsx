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
import { SongEndpoints } from '../../../api/song/SongEndpoints';
import { PersonEndpoints } from '../../../api/person/PersonEndpoints';
import { TagEndpoints } from '../../../api/tag/TagEndpoints';

type SongDetailResponse = {
    id: number;
    title: string;
    authorId: number | null;
    description: string | null;
    tags: { id: number; name: string; categoryId: number; categoryName: string; categoryColor: string }[];
};

type PersonResponse = {
    id: number;
    name: string;
    surname: string;
};

type TagResponse = {
    id: number;
    name: string;
    categoryId: number;
};

type PaginatedResponse<T> = {
    items: T[];
    total: number;
    limit: number;
    offset: number;
};

export function SongFormView() {
    const navigate = useNavigate();
    const { userId, id } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);

    const isEdit = id !== undefined && id !== 'new';

    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    const { data: songData, isLoading: songLoading } = useQuery({
        queryKey: ['adminSong', id],
        queryFn: async () => {
            const response = await axios.get<SongDetailResponse>(
                SongEndpoints.getSong(id!)
            );
            return response.data;
        },
        enabled: isEdit,
    });

    const { data: personsData, isLoading: personsLoading } = useQuery({
        queryKey: ['adminPersonsForSongForm'],
        queryFn: async () => {
            const response = await axios.get<PaginatedResponse<PersonResponse>>(
                PersonEndpoints.getPersons(),
                {
                    params: { limit: 100, offset: 0 },
                }
            );
            return response.data;
        },
    });

    const { data: tagsData, isLoading: tagsLoading } = useQuery({
        queryKey: ['adminTagsForSongForm'],
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

    useEffect(() => {
        if (songData) {
            setTitle(songData.title);
            setAuthorId(songData.authorId ?? '');
            setDescription(songData.description ?? '');
            setSelectedTagIds(songData.tags.map((t) => t.id));
        }
    }, [songData]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const body = {
                title,
                authorId,
                description: description || null,
                tagIds: selectedTagIds,
            };

            if (isEdit) {
                await axios.put(SongEndpoints.updateSong(id!), body, {
                    headers,
                });
            } else {
                await axios.post(SongEndpoints.createSong(), body, {
                    headers,
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminSongs'] });
            addNotification(
                isEdit ? 'Pieseň bola upravená' : 'Pieseň bola vytvorená',
                NotificationTypes.SUCCESS
            );
            navigate(`/dashboard/${userId}/song`);
        },
        onError: () => {
            addNotification(
                isEdit
                    ? 'Nepodarilo sa upraviť pieseň'
                    : 'Nepodarilo sa vytvoriť pieseň',
                NotificationTypes.ERROR
            );
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveMutation.mutate();
    };

    const handleTagToggle = (tagId: number) => {
        setSelectedTagIds((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    if ((isEdit && songLoading) || personsLoading || tagsLoading) {
        return (
            <Container>
                <Loader loading />
            </Container>
        );
    }

    return (
        <Container>
            <h2>{isEdit ? 'Upraviť pieseň' : 'Vytvoriť pieseň'}</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormGroup>
                        <InputGroup>
                            <Label htmlFor="title">Názov</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="authorId">Autor</Label>
                            <select
                                id="authorId"
                                value={authorId}
                                onChange={(e) =>
                                    setAuthorId(Number(e.target.value))
                                }
                                required
                            >
                                <option value="" disabled>
                                    Vyberte autora
                                </option>
                                {personsData?.items.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.name} {person.surname}
                                    </option>
                                ))}
                            </select>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="description">Popis</Label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Tagy</Label>
                            <div>
                                {tagsData?.items.map((tag) => (
                                    <label
                                        key={tag.id}
                                        style={{
                                            display: 'block',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTagIds.includes(
                                                tag.id
                                            )}
                                            onChange={() =>
                                                handleTagToggle(tag.id)
                                            }
                                        />{' '}
                                        {tag.name}
                                    </label>
                                ))}
                            </div>
                        </InputGroup>
                    </FormGroup>
                    <Button
                        accent
                        type="submit"
                        disabled={saveMutation.isPending}
                    >
                        {isEdit ? 'Uložiť' : 'Vytvoriť'}
                    </Button>
                </FormContent>
            </form>
        </Container>
    );
}
