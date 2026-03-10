import { Container } from '@musica-sacra/layout';
import { Table } from '../../../components/table/Table';
import { Loader } from '@musica-sacra/loader';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { ReviewEndpoints } from '../../../api/review/ReviewEndpoints';

type ReviewRow = {
    id: string;
    reviewableId: string;
    userId: string;
    status: string;
    closedAt: string;
};

type ReviewResponse = {
    id: number;
    reviewable_id: number;
    user_id: number;
    redactor_id: number | null;
    status: string;
    closed_at: string | null;
};

const STATUS_LABELS: Record<string, string> = {
    open: 'Otvorene',
    approved: 'Schvalene',
    rejected: 'Zamietnute',
};

const STATUS_FILTERS = ['all', 'open', 'approved', 'rejected'] as const;
const STATUS_FILTER_LABELS: Record<string, string> = {
    all: 'Vsetky',
    open: 'Otvorene',
    approved: 'Schvalene',
    rejected: 'Zamietnute',
};

export function ReviewListView() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const { data, isLoading } = useQuery({
        queryKey: ['adminReviews', statusFilter],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const params: Record<string, string> = {};
            if (statusFilter !== 'all') {
                params.status = statusFilter;
            }
            const response = await axios.get<ReviewResponse[]>(
                ReviewEndpoints.listReviews(),
                {
                    params,
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        },
    });

    const items: ReviewRow[] =
        data?.map((review) => ({
            id: String(review.id),
            reviewableId: String(review.reviewable_id),
            userId: String(review.user_id),
            status: STATUS_LABELS[review.status] || review.status,
            closedAt: review.closed_at
                ? new Date(review.closed_at).toLocaleDateString('sk-SK')
                : '—',
        })) ?? [];

    return (
        <Container>
            <h2>Recenzie</h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {STATUS_FILTERS.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => setStatusFilter(filter)}
                        style={{
                            padding: '6px 16px',
                            cursor: 'pointer',
                            fontWeight:
                                statusFilter === filter ? 'bold' : 'normal',
                            borderBottom:
                                statusFilter === filter
                                    ? '2px solid #333'
                                    : '2px solid transparent',
                        }}
                    >
                        {STATUS_FILTER_LABELS[filter]}
                    </button>
                ))}
            </div>

            <Loader loading={isLoading}>
                <Table
                    items={items}
                    columns={[
                        {
                            key: 'id',
                            label: 'ID',
                            size: 'small',
                            isSortFilter: true,
                        },
                        {
                            key: 'reviewableId',
                            label: 'Obsah ID',
                            size: 'small',
                            isSortFilter: false,
                        },
                        {
                            key: 'userId',
                            label: 'Uzivatel ID',
                            size: 'small',
                            isSortFilter: false,
                        },
                        {
                            key: 'status',
                            label: 'Stav',
                            size: 'medium',
                            isSortFilter: true,
                        },
                        {
                            key: 'closedAt',
                            label: 'Uzavrete',
                            size: 'medium',
                            isSortFilter: false,
                        },
                    ]}
                    onEdit={(item) =>
                        navigate(
                            `/dashboard/${userId}/review/${item.id}/detail`
                        )
                    }
                />
            </Loader>
        </Container>
    );
}
