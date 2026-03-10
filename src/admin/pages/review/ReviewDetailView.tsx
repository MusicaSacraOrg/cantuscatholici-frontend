import { Container } from '@musica-sacra/layout';
import { Button } from '@musica-sacra/forms';
import { Loader } from '@musica-sacra/loader';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import axios from 'axios';
import { ReviewEndpoints } from '../../../api/review/ReviewEndpoints';

type CommentResponse = {
    id: number;
    commenter_id: number;
    content: string;
    created_at: string | null;
};

type ReviewDetailResponse = {
    id: number;
    reviewable_id: number;
    user_id: number;
    redactor_id: number | null;
    status: string;
    closed_at: string | null;
    comments: CommentResponse[];
};

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
    open: { label: 'Caka na schvalenie', color: '#f0ad4e' },
    approved: { label: 'Schvalene', color: '#5cb85c' },
    rejected: { label: 'Zamietnute', color: '#d9534f' },
};

export function ReviewDetailView() {
    const { userId, id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);
    const [commentText, setCommentText] = useState('');

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const { data: review, isLoading } = useQuery({
        queryKey: ['adminReview', id],
        queryFn: async () => {
            const response = await axios.get<ReviewDetailResponse>(
                ReviewEndpoints.getReview(id!),
                { headers }
            );
            return response.data;
        },
        enabled: !!id,
    });

    const approveMutation = useMutation({
        mutationFn: async () => {
            await axios.post(ReviewEndpoints.approveReview(id!), {}, { headers });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminReview', id] });
            queryClient.invalidateQueries({ queryKey: ['adminReviews'] });
            addNotification('Recenzia bola schvalena', NotificationTypes.SUCCESS);
        },
        onError: () => {
            addNotification('Nepodarilo sa schvalit recenziu', NotificationTypes.ERROR);
        },
    });

    const rejectMutation = useMutation({
        mutationFn: async () => {
            await axios.post(ReviewEndpoints.rejectReview(id!), {}, { headers });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminReview', id] });
            queryClient.invalidateQueries({ queryKey: ['adminReviews'] });
            addNotification('Recenzia bola zamietnuta', NotificationTypes.SUCCESS);
        },
        onError: () => {
            addNotification('Nepodarilo sa zamietnut recenziu', NotificationTypes.ERROR);
        },
    });

    const commentMutation = useMutation({
        mutationFn: async () => {
            await axios.post(
                ReviewEndpoints.addComment(id!),
                { content: commentText },
                { headers }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminReview', id] });
            setCommentText('');
            addNotification('Komentar bol pridany', NotificationTypes.SUCCESS);
        },
        onError: () => {
            addNotification('Nepodarilo sa pridat komentar', NotificationTypes.ERROR);
        },
    });

    if (!id) return null;

    const badge = review ? STATUS_BADGES[review.status] : null;

    return (
        <Container>
            <button
                type="button"
                onClick={() => navigate(`/dashboard/${userId}/review`)}
                style={{ marginBottom: '16px', cursor: 'pointer' }}
            >
                &larr; Spat na zoznam
            </button>

            <Loader loading={isLoading}>
                {review && (
                    <>
                        <h2>Recenzia #{review.id}</h2>

                        {badge && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    backgroundColor: badge.color,
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    marginBottom: '16px',
                                }}
                            >
                                {badge.label}
                            </span>
                        )}

                        <div style={{ marginBottom: '24px' }}>
                            <p><strong>Obsah ID:</strong> {review.reviewable_id}</p>
                            <p><strong>Uzivatel ID:</strong> {review.user_id}</p>
                            {review.redactor_id && (
                                <p><strong>Redaktor ID:</strong> {review.redactor_id}</p>
                            )}
                            {review.closed_at && (
                                <p>
                                    <strong>Uzavrete:</strong>{' '}
                                    {new Date(review.closed_at).toLocaleDateString('sk-SK')}
                                </p>
                            )}
                        </div>

                        {review.status === 'open' && (
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                                <Button
                                    accent
                                    onClick={() => approveMutation.mutate()}
                                    disabled={approveMutation.isPending}
                                >
                                    Schvalit
                                </Button>
                                <Button
                                    onClick={() => rejectMutation.mutate()}
                                    disabled={rejectMutation.isPending}
                                >
                                    Zamietnut
                                </Button>
                            </div>
                        )}

                        <h3>Komentare</h3>
                        {review.comments.length > 0 ? (
                            <div style={{ marginBottom: '16px' }}>
                                {review.comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        style={{
                                            border: '1px solid #eee',
                                            padding: '12px',
                                            marginBottom: '8px',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <p>{comment.content}</p>
                                        <small style={{ color: '#999' }}>
                                            Uzivatel #{comment.commenter_id}
                                            {comment.created_at &&
                                                ` - ${new Date(comment.created_at).toLocaleDateString('sk-SK')}`}
                                        </small>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '16px' }}>
                                Zatial ziadne komentare.
                            </p>
                        )}

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (commentText.trim()) {
                                    commentMutation.mutate();
                                }
                            }}
                        >
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Napisat komentar..."
                                rows={3}
                                style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
                            />
                            <Button
                                type="submit"
                                disabled={commentMutation.isPending || !commentText.trim()}
                            >
                                Pridat komentar
                            </Button>
                        </form>
                    </>
                )}
            </Loader>
        </Container>
    );
}
