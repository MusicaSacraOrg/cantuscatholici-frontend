import { useBem } from '@musica-sacra/hooks';
import { LayoutWithSidebar } from '@musica-sacra/layout';
import { Tag } from '../../components/tag/Tag';
import { HomepageSidebar } from './HomepageSidebar';
import { FormContent, FormRow, Input } from '@musica-sacra/forms';

export function HomepageView() {
    const { bem } = useBem('view-homepage');

    return (
        <LayoutWithSidebar
            isPageLayout={true}
            sidebar={<HomepageSidebar />}
            className={bem()}
        >
            <div>
                <form>
                    <FormContent>
                        <FormRow>
                            <Input
                                placeholder={
                                    'Zadaj názov piesne, alebo časť textu'
                                }
                            />
                        </FormRow>
                    </FormContent>
                </form>
                <Tag name={'Vianocne'} color={'green'} />
                Homepage view
            </div>
        </LayoutWithSidebar>
    );
}
