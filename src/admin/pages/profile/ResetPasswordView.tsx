import { Container } from '@musica-sacra/layout';
import {
    Button,
    FormContent,
    FormGroup,
    Input,
    InputGroup,
    Label,
} from '@musica-sacra/forms';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState, FormEvent } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import axios from 'axios';
import { UserEndpoints } from '../../../api/user/UserEndpoints';

export function ResetPasswordView() {
    const navigate = useNavigate();
    const { addNotification } = useContext(NotificationsContext);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const saveMutation = useMutation({
        mutationFn: async () => {
            if (newPassword !== confirmPassword) {
                throw new Error('Heslá sa nezhodujú');
            }
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            await axios.put(
                UserEndpoints.changePassword(),
                { oldPassword, newPassword },
                { headers }
            );
        },
        onSuccess: () => {
            addNotification('Heslo bolo zmenené', NotificationTypes.SUCCESS);
            navigate('/dashboard');
        },
        onError: (error) => {
            const message =
                error instanceof Error && error.message === 'Heslá sa nezhodujú'
                    ? 'Heslá sa nezhodujú'
                    : 'Nepodarilo sa zmeniť heslo';
            addNotification(message, NotificationTypes.ERROR);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveMutation.mutate();
    };

    return (
        <Container>
            <h2>Zmeniť heslo</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormGroup>
                        <InputGroup>
                            <Label htmlFor="oldPassword">Aktuálne heslo</Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="newPassword">Nové heslo</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="confirmPassword">
                                Potvrdiť nové heslo
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </InputGroup>
                    </FormGroup>
                    <Button accent type="submit" disabled={saveMutation.isPending}>
                        Zmeniť heslo
                    </Button>
                </FormContent>
            </form>
        </Container>
    );
}
