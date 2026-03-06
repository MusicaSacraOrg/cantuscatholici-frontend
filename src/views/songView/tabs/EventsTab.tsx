import { useBem } from '@musica-sacra/hooks';

export function EventsTab() {
    const { bem } = useBem('events-tab');

    return (
        <div className={bem()}>
            <h2>Slávenia</h2>
            <p>Slávenia budú dostupné čoskoro.</p>
        </div>
    );
}
