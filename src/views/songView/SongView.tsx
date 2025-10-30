import { King } from '@musica-sacra/layout';
import { SongRouter } from '../../router/routers/SongRouter';
import { SongNavigation } from './SongNavigation';

export function SongView() {
    return (
        <King
            leftSidebar={<SongNavigation songId={'1'} />}
            rightSidebar={<div>Right sidebar</div>}
            isPageLayout={true}
        >
            <SongRouter />
        </King>
    );
}
