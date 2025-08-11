import { useBem } from '@musica-sacra/hooks';
import { LayoutBasic } from '@musica-sacra/layout';

export function NotFoundView() {
    const { bem } = useBem('view-not-found');

    return (
        <LayoutBasic isPageLayout={true} classname={bem()}>
            <h2>404</h2>
            <p>Ľutujeme, zadanú adresu sa nepodarilo náisť</p>
        </LayoutBasic>
    );
}
