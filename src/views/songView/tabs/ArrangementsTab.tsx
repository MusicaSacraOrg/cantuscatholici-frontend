import { useBem } from '@musica-sacra/hooks';

export function ArrangementsTab() {
    const { bem } = useBem('arrangements-tab');

    return (
        <div className={bem()}>
            <h2>Úpravy a medzihry</h2>
            <p>Úpravy a medzihry budú dostupné čoskoro.</p>
        </div>
    );
}
