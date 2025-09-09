import { LayoutBasic } from '@musica-sacra/layout';
import { useBem } from '@musica-sacra/hooks';

export function AboutView() {
    const { bem } = useBem('view-about');

    return (
        <LayoutBasic isPageLayout={true} className={bem()}>
            Tu pojde daco o projekte
        </LayoutBasic>
    );
}
