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

export function RegisterView() {
    const { bem } = useBem('view-register');

    return (
        <LayoutBasic isPageLayout={true} className={bem()}>
            <h2>Registrácia</h2>
            <form>
                <FormContent>
                    <FormRow>
                        <FormGroup>
                            <Label>Mano</Label>
                            <Input placeholder={'Meno'} type={'text'} />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Priezvisko</Label>
                            <Input placeholder={'Priezvisko'} type={'text'} />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder={'Email'} type={'email'} />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Heslo</Label>
                            <Input placeholder={'Heslo'} type={'password'} />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label>Potvrdiť heslo</Label>
                            <Input
                                placeholder={'Potvrdiť heslo'}
                                type={'password'}
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
        </LayoutBasic>
    );
}
