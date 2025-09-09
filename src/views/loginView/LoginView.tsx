import { useBem } from '@musica-sacra/hooks';
import { LayoutBasic } from '@musica-sacra/layout';
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

export function LoginView() {
    const { bem } = useBem('view-login');

    const [email, setEmail] = useState('');

    return (
        <LayoutBasic isPageLayout={true} className={bem()}>
            <h2>Prihlásenie</h2>
            <form>
                <FormContent>
                    <FormRow>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                placeholder={'Email'}
                                type={'email'}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Heslo</Label>
                            <Input placeholder={'Heslo'} type={'password'} />
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
        </LayoutBasic>
    );
}
