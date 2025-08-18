import { useBem } from '@musica-sacra/hooks';
import { LayoutBasic } from '@musica-sacra/layout';

export function LoginView() {
    const { bem } = useBem('view-login');

    return (
        <LayoutBasic isPageLayout={true} classname={bem()}>
            <div>Login view</div>
        </LayoutBasic>
    );
}
