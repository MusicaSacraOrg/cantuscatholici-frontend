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
import { useContext, useEffect, useState, FormEvent, useCallback } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import axios from 'axios';
import { SongEndpoints } from '../../../api/song/SongEndpoints';
import { PersonEndpoints } from '../../../api/person/PersonEndpoints';
import { TagEndpoints } from '../../../api/tag/TagEndpoints';
import { StaticContentEndpoints } from '../../../api/staticContent/StaticContentEndpoints';
import { ContentEndpoints } from '../../../api/content/ContentEndpoints';
import { SongLyrics, LyricsPart } from '../../../models/song';
import { FileUpload } from '../../../components/fileUpload/FileUpload';

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
    const [lyricsParts, setLyricsParts] = useState<LyricsPart[]>([]);
    const [msczFileId, setMsczFileId] = useState<number | null>(null);
    const [svgFileId, setSvgFileId] = useState<number | null>(null);
    const [pdfFileId, setPdfFileId] = useState<number | null>(null);
    const [mp3FileId, setMp3FileId] = useState<number | null>(null);
    const [msczUploading, setMsczUploading] = useState(false);

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

    const { data: lyricsData } = useQuery({
        queryKey: ['adminSongLyrics', id],
        queryFn: async () => {
            const response = await axios.get<SongLyrics>(
                SongEndpoints.getSongLyrics(id!)
            );
            return response.data;
        },
        enabled: isEdit,
    });

    useEffect(() => {
        if (lyricsData) {
            setLyricsParts(lyricsData.parts);
        }
    }, [lyricsData]);

    useEffect(() => {
        if (songData) {
            setTitle(songData.title);
            setAuthorId(songData.authorId ?? '');
            setDescription(songData.description ?? '');
            setSelectedTagIds(songData.tags.map((t) => t.id));
        }
    }, [songData]);

    const handleAddPart = useCallback((partType: string) => {
        setLyricsParts((prev) => [...prev, { partType, lyrics: '' }]);
    }, []);

    const handleRemovePart = useCallback((index: number) => {
        setLyricsParts((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const handlePartChange = useCallback(
        (index: number, field: keyof LyricsPart, value: string) => {
            setLyricsParts((prev) =>
                prev.map((part, i) =>
                    i === index ? { ...part, [field]: value } : part
                )
            );
        },
        []
    );

    const handleMovePart = useCallback(
        (index: number, direction: -1 | 1) => {
            setLyricsParts((prev) => {
                const newParts = [...prev];
                const targetIndex = index + direction;
                if (targetIndex < 0 || targetIndex >= newParts.length) return prev;
                [newParts[index], newParts[targetIndex]] = [
                    newParts[targetIndex],
                    newParts[index],
                ];
                return newParts;
            });
        },
        []
    );

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

            let songId: string | number;
            if (isEdit) {
                await axios.put(SongEndpoints.updateSong(id!), body, {
                    headers,
                });
                songId = id!;
            } else {
                const resp = await axios.post(SongEndpoints.createSong(), body, {
                    headers,
                });
                songId = resp.data.id;
            }

            if (lyricsParts.length > 0) {
                await axios.put(
                    SongEndpoints.updateSongLyrics(songId),
                    {
                        parts: lyricsParts.map((p) => ({
                            part_type: p.partType,
                            lyrics: p.lyrics,
                        })),
                    },
                    { headers }
                );
            }

            if (msczFileId && svgFileId && pdfFileId) {
                const msczResp = await axios.post(
                    ContentEndpoints.createMsczContent(),
                    {
                        c_mscz_file_id: msczFileId,
                        c_svg_file_id: svgFileId,
                        pdf_file_id: pdfFileId,
                        mp3_file_id: mp3FileId,
                    },
                    { headers }
                );
                await axios.put(
                    SongEndpoints.setSongMscz(songId),
                    { mscz_id: msczResp.data.id },
                    { headers }
                );
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
                        <InputGroup>
                            <Label>Text piesne</Label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => handleAddPart('verse')}
                                    style={{ padding: '4px 12px', cursor: 'pointer' }}
                                >
                                    + Sloha
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddPart('refrain')}
                                    style={{ padding: '4px 12px', cursor: 'pointer' }}
                                >
                                    + Refren
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAddPart('bridge')}
                                    style={{ padding: '4px 12px', cursor: 'pointer' }}
                                >
                                    + Bridge
                                </button>
                            </div>
                            {lyricsParts.map((part, index) => (
                                <div
                                    key={index}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '12px',
                                        marginBottom: '8px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <select
                                            value={part.partType}
                                            onChange={(e) => handlePartChange(index, 'partType', e.target.value)}
                                        >
                                            <option value="verse">Sloha</option>
                                            <option value="refrain">Refren</option>
                                            <option value="bridge">Bridge</option>
                                            <option value="coda">Koda</option>
                                            <option value="intro">Intro</option>
                                        </select>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button
                                                type="button"
                                                onClick={() => handleMovePart(index, -1)}
                                                disabled={index === 0}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                ^
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleMovePart(index, 1)}
                                                disabled={index === lyricsParts.length - 1}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                v
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePart(index)}
                                                style={{ color: 'red', cursor: 'pointer' }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                    <textarea
                                        value={part.lyrics}
                                        onChange={(e) => handlePartChange(index, 'lyrics', e.target.value)}
                                        rows={4}
                                        style={{ width: '100%', resize: 'vertical' }}
                                        placeholder="Text..."
                                    />
                                </div>
                            ))}
                        </InputGroup>
                        <InputGroup>
                            <Label>Noty (MuseScore)</Label>
                            {isEdit && songData && (songData as any).msczContent && (
                                <p style={{ marginBottom: '8px', color: '#5cb85c' }}>
                                    Piesen uz ma nahrane noty. Nahrajte nove subory pre nahradenie.
                                </p>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div>
                                    <p style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                                        .mscz subor {msczFileId ? '(nahrane)' : '(povinne)'}
                                    </p>
                                    <FileUpload
                                        accept=".mscz"
                                        label="Nahrajte .mscz subor"
                                        onUploaded={(file) => setMsczFileId(file.id)}
                                    />
                                </div>
                                <div>
                                    <p style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                                        .svg subor {svgFileId ? '(nahrane)' : '(povinne)'}
                                    </p>
                                    <FileUpload
                                        accept=".svg"
                                        label="Nahrajte .svg subor"
                                        onUploaded={(file) => setSvgFileId(file.id)}
                                    />
                                </div>
                                <div>
                                    <p style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                                        .pdf subor {pdfFileId ? '(nahrane)' : '(povinne)'}
                                    </p>
                                    <FileUpload
                                        accept=".pdf"
                                        label="Nahrajte .pdf subor"
                                        onUploaded={(file) => setPdfFileId(file.id)}
                                    />
                                </div>
                                <div>
                                    <p style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                                        .mp3 subor {mp3FileId ? '(nahrane)' : '(volitelne)'}
                                    </p>
                                    <FileUpload
                                        accept=".mp3"
                                        label="Nahrajte .mp3 subor (volitelne)"
                                        onUploaded={(file) => setMp3FileId(file.id)}
                                    />
                                </div>
                            </div>
                        </InputGroup>
                    </FormGroup>
                    <Button
                        accent
                        type="submit"
                        disabled={saveMutation.isPending}
                    >
                        {isEdit ? 'Uloziť' : 'Vytvoriť'}
                    </Button>
                </FormContent>
            </form>
        </Container>
    );
}
