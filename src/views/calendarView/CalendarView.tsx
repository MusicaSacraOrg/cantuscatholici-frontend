import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';

export function CalendarView() {
    const { bem } = useBem('view-calendar');

    return (
        <Queen
            isPageLayout={true}
            sidebar={<div>Sidebar</div>}
            className={bem()}
        >
            <div>Calendar</div>
        </Queen>
    );
}
