import { Prince } from '@musica-sacra/layout';
import { useBem } from '@musica-sacra/hooks';

export function AboutView() {
    const { bem } = useBem('view-about');

    return (
        <Prince isPageLayout={true} className={bem()}>
            Tu pojde daco o projekte
        </Prince>
    );
}
