import { useBem } from '@musica-sacra/hooks';
import { NavLink, useSearchParams } from 'react-router';
import { useGetList } from '@musica-sacra/api';
import { Loader } from '@musica-sacra/loader';
import { Paths } from '../../router/paths';

type EventCategory = { id: string; name: string };

export function CalendarSidebar() {
    const { bem } = useBem('view-calendar-sidebar');
    const [searchParams] = useSearchParams();
    const currentCategoryId = searchParams.get('category') ?? '';

    const { query } = useGetList<EventCategory>(
        '/mocks/eventCategories.json',
        'eventCategories'
    );

    return (
        <div className={bem()}>
            <h2 className={bem('title')}>Kalendar</h2>
            <h3 className={bem('subtitle')}>Slávenia</h3>
            <Loader loading={query.isLoading}>
                <nav className={bem('nav')} aria-label="Kategórie kalendára">
                    {query.data?.items?.map((category) => {
                        const to = `${Paths.CALENDAR}?category=${category.id}`;
                        const isActive = currentCategoryId === category.id;
                        return (
                            <NavLink
                                key={category.id}
                                to={to}
                                className={bem('link', { active: isActive })}
                            >
                                {category.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </Loader>
        </div>
    );
}
