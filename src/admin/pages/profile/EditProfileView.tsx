import { Container } from '@musica-sacra/layout';
import {
    Button,
    FormContent,
    FormGroup,
    Input,
    InputGroup,
    Label,
} from '@musica-sacra/forms';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState, FormEvent } from 'react';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import axios from 'axios';
import { UserEndpoints } from '../../../api/user/UserEndpoints';
import { useUser } from '../../../context/userContext/useUser';

export function EditProfileView() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const queryClient = useQueryClient();
    const { addNotification } = useContext(NotificationsContext);
    const { user } = useUser();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setMobile(user.mobile ?? '');
            setDescription(user.description ?? '');
        }
    }, [user]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const body = {
                name,
                surname,
                email,
                mobile: mobile || null,
                description: description || null,
            };
            const response = await axios.put(
                UserEndpoints.updateProfile(),
                body,
                { headers }
            );
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token.accessToken);
            queryClient.setQueryData(['currentUser'], data.user);
            addNotification(
                'Profil bol aktualizovaný',
                NotificationTypes.SUCCESS
            );
            navigate(`/dashboard/${userId}/home`);
        },
        onError: () => {
            addNotification(
                'Nepodarilo sa aktualizovať profil',
                NotificationTypes.ERROR
            );
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        saveMutation.mutate();
    };

    return (
        <Container>
            <h2>Upraviť profil</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormGroup>
                        <InputGroup>
                            <Label htmlFor="name">Meno</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="surname">Priezvisko</Label>
                            <Input
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="mobile">Telefónne číslo</Label>
                            <Input
                                id="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="description">Popis</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </InputGroup>
                    </FormGroup>
                    <Button accent type="submit" disabled={saveMutation.isPending}>
                        Uložiť
                    </Button>
                </FormContent>
            </form>
        </Container>
    );
}
