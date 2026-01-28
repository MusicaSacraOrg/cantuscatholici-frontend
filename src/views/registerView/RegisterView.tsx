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
import { useRegister } from '../../api/auth/useRegister';

export function RegisterView() {
    const { bem } = useBem('view-register');
    const registerMutation = useRegister();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        registerMutation.mutate({
            name,
            surname,
            email,
            mobile,
            password,
        });
    };

    return (
        <Prince isPageLayout={true} className={bem()}>
            <h2>Registrácia</h2>
            <form onSubmit={handleSubmit}>
                <FormContent>
                    <FormRow>
                        <FormGroup>
                            <Label>Mano</Label>
                            <Input
                                placeholder={'Meno'}
                                type={'text'}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Priezvisko</Label>
                            <Input
                                placeholder={'Priezvisko'}
                                type={'text'}
                                required
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                placeholder={'Email'}
                                type={'email'}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Heslo</Label>
                            <Input
                                placeholder={'Heslo'}
                                type={'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Potvrdiť heslo</Label>
                            <Input
                                placeholder={'Potvrdiť heslo'}
                                type={'password'}
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Telefónne číslo</Label>
                            <Input
                                placeholder={'Telefónne číslo'}
                                type={'text'}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Popis</Label>
                            <Input
                                placeholder={'Popis'}
                                type={'text'}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <Button type={'submit'} rounded>
                        Registrovať sa
                    </Button>
                </FormContent>
            </form>
            <p>
                Máte účet? <Link to={Paths.LOGIN}>Prihlásiť sa.</Link>
            </p>
        </Prince>
    );
}
