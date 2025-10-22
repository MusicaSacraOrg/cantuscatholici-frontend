import { useBem } from '@musica-sacra/hooks';
import { Prince } from '@musica-sacra/layout';
import {
    Button,
    FormContent,
    FormGroup,
    FormRow,
    Input,
    Label,
} from '@musica-sacra/forms';
import { Link } from 'react-router';
import { Paths } from '../../router/paths';
import { useState } from 'react';
import { useLogin } from '../../api/auth/useLogin';

export function LoginView() {
    const { bem } = useBem('view-login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useLogin();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        loginMutation.mutate({ email, password });
    };

    return (
        <Prince isPageLayout={true} className={bem()}>
            <h2>Prihlásenie</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormRow>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                placeholder={'Email'}
                                type={'email'}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Heslo</Label>
                            <Input
                                required
                                value={password}
                                placeholder={'Heslo'}
                                type={'password'}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <Button type={'submit'} rounded>
                        Prihlásiť sa
                    </Button>
                </FormContent>
            </form>
            <p>
                Ešte nemáte účet?{' '}
                <Link to={Paths.REGISTER}>Registrovať sa.</Link>
            </p>
        </Prince>
    );
}
