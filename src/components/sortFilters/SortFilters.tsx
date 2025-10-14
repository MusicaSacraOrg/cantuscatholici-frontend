import { useBem } from '@musica-sacra/hooks';
import { SortFilter } from './SortFilter';
import { useEffect, useState } from 'react';
import { useUrlParams } from '../../views/homepageView/useUrlParams';

export type SortOrderName = 'alphabetical' | 'numerical';
export type SortDirection = 'ascending' | 'descending';

export type SortState = {
    orderName: SortOrderName;
    order: SortDirection;
};

type SortFiltersProps = {
    onChange?: (sortState: SortState) => void;
};

export function SortFilters({ onChange }: SortFiltersProps) {
    const { bem } = useBem('sort-filters');
    const { setParams, getParams } = useUrlParams();

    // Initialize from URL or fallback
    const params = getParams();
    const [sortState, setSortState] = useState<SortState>({
        orderName: (params.sort as SortOrderName) || 'alphabetical',
        order: (params.direction as SortDirection) || 'ascending',
    });

    // Sync URL whenever sort changes
    useEffect(() => {
        setParams({
            sort: sortState.orderName,
            direction: sortState.order,
        });
        onChange?.(sortState);
    }, [sortState, setParams, onChange]);

    const handleFilterClick = (orderName: SortOrderName) => {
        setSortState((prev) => {
            if (prev.orderName === orderName) {
                return {
                    ...prev,
                    order:
                        prev.order === 'ascending' ? 'descending' : 'ascending',
                };
            } else {
                return {
                    orderName,
                    order: 'ascending',
                };
            }
        });
    };

    return (
        <div className={bem()}>
            <SortFilter
                label="A - Z"
                active={sortState.orderName === 'alphabetical'}
                ascending={sortState.order === 'ascending'}
                onClick={() => handleFilterClick('alphabetical')}
            />
            <SortFilter
                label="1 - 9"
                active={sortState.orderName === 'numerical'}
                ascending={sortState.order === 'ascending'}
                onClick={() => handleFilterClick('numerical')}
            />
        </div>
    );
}
