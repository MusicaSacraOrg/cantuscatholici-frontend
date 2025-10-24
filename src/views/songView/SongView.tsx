import { King } from '@musica-sacra/layout';

export function SongView() {
    return (
        <King
            leftSidebar={<div>Left sidebar</div>}
            rightSidebar={<div>Right sidebar</div>}
        >
            SOng detail content
        </King>
    );
}
