import { useBem } from '@musica-sacra/hooks';
import { EventInfo } from './EventInfo';

/**
 * Page for a single event (route /calendar/:id).
 * Opened when user clicks an event from the calendar list (e.g. event name).
 * Renders EventInfo (general info + songs). Add more sections here later (e.g. full detail, related content).
 */
export function EventDetail() {
    const { bem } = useBem('view-calendar-event-detail');

    return (
        <div className={bem()}>
            <EventInfo />
        </div>
    );
}
