import { useBem } from '@musica-sacra/hooks';
import { Prince } from '@musica-sacra/layout';

export function NotFoundView() {
    const { bem } = useBem('view-not-found');

    return (
        <Prince isPageLayout={true} className={bem()}>
            <h2>404</h2>
            <p>Ľutujeme, zadanú adresu sa nepodarilo náisť</p>
        </Prince>
    );
}
