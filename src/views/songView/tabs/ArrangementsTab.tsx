import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SongContext } from '../SongView';
import { Endpoints } from '../../../api/Endpoints';
import { useBem } from '@musica-sacra/hooks';
import { Loader } from '@musica-sacra/loader';

type UserContentItem = {
    id: number;
    title: string;
    description?: string;
    contentType?: string;
    fileId?: number;
    addedByUserId: number;
    addedByName?: string;
    addedAt?: string;
    reviewStatus?: string;
};

type UserContentList = {
    total: number;
    items: UserContentItem[];
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
    predohra: 'Predohra',
    dohra: 'Dohra',
    medzihra: 'Medzihra',
    aranzma: 'Aranzma',
};

export function ArrangementsTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('arrangements-tab');
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formType, setFormType] = useState('predohra');

    const { data, isLoading } = useQuery({
        queryKey: ['songContent', song?.id],
        queryFn: async () => {
            const response = await axios.get<UserContentList>(
                `${Endpoints.baseUrl}/api/song/${song!.id}/content`
            );
            return response.data;
        },
        enabled: !!song?.id,
    });

    const submitMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            await axios.post(
                `${Endpoints.baseUrl}/api/song/${song!.id}/content`,
                {
                    title: formTitle,
                    description: formDesc || null,
                    content_type: formType,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['songContent', song?.id],
            });
            setShowForm(false);
            setFormTitle('');
            setFormDesc('');
        },
    });

    if (!song) return null;

    const grouped: Record<string, UserContentItem[]> = {};
    for (const item of data?.items || []) {
        const key = item.contentType || 'other';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    }

    return (
        <div className={bem()}>
            <h2>Upravy a medzihry</h2>

            <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                style={{
                    padding: '8px 16px',
                    marginBottom: '16px',
                    cursor: 'pointer',
                }}
            >
                {showForm ? 'Zrusit' : '+ Pridat obsah'}
            </button>

            {showForm && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitMutation.mutate();
                    }}
                    style={{
                        border: '1px solid #ddd',
                        padding: '16px',
                        marginBottom: '16px',
                        borderRadius: '4px',
                    }}
                >
                    <div style={{ marginBottom: '8px' }}>
                        <label>
                            Typ:{' '}
                            <select
                                value={formType}
                                onChange={(e) => setFormType(e.target.value)}
                            >
                                <option value="predohra">Predohra</option>
                                <option value="dohra">Dohra</option>
                                <option value="medzihra">Medzihra</option>
                                <option value="aranzma">Aranzma</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <input
                            type="text"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder="Nazov"
                            required
                            style={{ width: '100%', padding: '6px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <textarea
                            value={formDesc}
                            onChange={(e) => setFormDesc(e.target.value)}
                            placeholder="Popis (volitelny)"
                            rows={3}
                            style={{ width: '100%', padding: '6px' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitMutation.isPending}
                        style={{ padding: '6px 16px', cursor: 'pointer' }}
                    >
                        Odoslat
                    </button>
                </form>
            )}

            <Loader loading={isLoading}>
                {data && data.items.length > 0 ? (
                    Object.entries(grouped).map(([type, items]) => (
                        <div key={type} style={{ marginBottom: '24px' }}>
                            <h3>
                                {CONTENT_TYPE_LABELS[type] || type}
                            </h3>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        border: '1px solid #eee',
                                        padding: '12px',
                                        marginBottom: '8px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <strong>{item.title}</strong>
                                        {item.reviewStatus === 'approved' && (
                                            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#5cb85c', color: '#fff' }}>
                                                Schvalene
                                            </span>
                                        )}
                                        {item.reviewStatus === 'open' && (
                                            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f0ad4e', color: '#fff' }}>
                                                Caka na schvalenie
                                            </span>
                                        )}
                                        {item.reviewStatus === 'rejected' && (
                                            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#d9534f', color: '#fff' }}>
                                                Zamietnute
                                            </span>
                                        )}
                                    </div>
                                    {item.description && (
                                        <p style={{ margin: '4px 0', color: '#666' }}>
                                            {item.description}
                                        </p>
                                    )}
                                    <small style={{ color: '#999' }}>
                                        {item.addedByName}
                                        {item.addedAt &&
                                            ` - ${new Date(item.addedAt).toLocaleDateString('sk-SK')}`}
                                    </small>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#888', fontStyle: 'italic' }}>
                        Zatial ziadne upravy ani medzihry.
                    </p>
                )}
            </Loader>
        </div>
    );
}
