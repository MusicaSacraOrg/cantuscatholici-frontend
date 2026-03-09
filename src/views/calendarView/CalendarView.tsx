import { useBem } from '@musica-sacra/hooks';
import { Queen } from '@musica-sacra/layout';
import { Outlet } from 'react-router';
import { CalendarSidebar } from './CalendarSidebar';

export function CalendarView() {
    const { bem } = useBem('view-calendar');

    return (
        <Queen
            isPageLayout={true}
            sidebar={
                <div className={bem('sidebar')}>
                    <CalendarSidebar />
                </div>
            }
            className={bem()}
        >
            <Outlet />
        </Queen>
    );
}
