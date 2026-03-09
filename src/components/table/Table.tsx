import { useBem } from '@musica-sacra/hooks';
import { ReactNode, useEffect, useState } from 'react';
import { Hr } from '../hr/Hr';
import { SortFilter } from '../sortFilters/SortFilter';
import { useUrlParams } from '../../views/homepageView/useUrlParams';

type ColumnSize = 'small' | 'medium' | 'large';

export type SortDirection = 'ascending' | 'descending';
export type SortState<T> = {
    columnKey: keyof T;
    direction: SortDirection;
};

type TableColumn<T> = {
    key: keyof T;
    label: string;
    size: ColumnSize;
    isSortFilter: boolean;
    render?: (value: unknown, row: T) => ReactNode;
};

type TableProps<T extends Record<string, ReactNode>> = {
    items: T[];
    columns: TableColumn<T>[];
    onSortChange?: (sortState: SortState<T>) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
};

export function Table<T extends Record<string, ReactNode> & { id: string }>({
    items,
    columns,
    onSortChange,
    onDelete,
    onEdit,
}: TableProps<T>) {
    const { bem } = useBem('table');
    const { getParams, setParams } = useUrlParams();

    // Initialize from URL
    const params = getParams();
    const initialKey = columns.find(
        (c) => c.key === (params.sort as keyof T)
    )?.key;
    const [sortState, setSortState] = useState<SortState<T>>({
        columnKey: initialKey || (columns[0]?.key as keyof T),
        direction: (params.direction as SortDirection) || 'ascending',
    });

    // Sync to URL and notify parent when sort changes
    useEffect(() => {
        setParams({
            sort: sortState.columnKey as string,
            direction: sortState.direction,
        });
        onSortChange?.(sortState);
    }, [sortState, setParams, onSortChange]);

    const handleSortClick = (key: keyof T) => {
        setSortState((prev) => {
            if (prev.columnKey === key) {
                return {
                    ...prev,
                    direction:
                        prev.direction === 'ascending'
                            ? 'descending'
                            : 'ascending',
                };
            } else {
                return { columnKey: key, direction: 'ascending' };
            }
        });
    };

    return (
        <div className={bem()}>
            <div className={bem('content')}>
                <div className={bem('header')}>
                    {columns.map((column) => {
                        const isActive = sortState.columnKey === column.key;
                        return (
                            <div
                                key={String(column.key)}
                                className={bem({
                                    column: true,
                                    'column--sort-filter': column.isSortFilter,
                                    [`column--${column.size}`]: true,
                                })}
                            >
                                {column.isSortFilter ? (
                                    <SortFilter
                                        label={column.label}
                                        active={isActive}
                                        ascending={
                                            sortState.direction === 'ascending'
                                        }
                                        onClick={() =>
                                            handleSortClick(column.key)
                                        }
                                    />
                                ) : (
                                    column.label
                                )}
                            </div>
                        );
                    })}

                    {/* Action column header */}
                    {(onEdit || onDelete) && (
                        <div
                            className={bem({
                                column: true,
                                'column--actions': true,
                            })}
                        ></div>
                    )}
                </div>
                <Hr />
                <div className={bem('body')}>
                    {items.map((item) => (
                        <>
                            <div key={item.id} className={bem('row')}>
                                {columns.map((column) => (
                                    <div
                                        key={column.label}
                                        className={bem({
                                            column: true,
                                            [`column--${column.size}`]: true,
                                        })}
                                    >
                                        {column.render
                                            ? column.render(
                                                  item[column.key],
                                                  item
                                              )
                                            : item[column.key]}
                                    </div>
                                ))}

                                {/* Action buttons */}
                                {(onEdit || onDelete) && (
                                    <div
                                        className={bem({
                                            column: true,
                                            'column--actions': true,
                                        })}
                                    >
                                        {onEdit && (
                                            <div
                                                className={bem('icon')}
                                                onClick={() => onEdit(item)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 -960 960 960"
                                                    width="24px"
                                                >
                                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                                </svg>
                                            </div>
                                        )}
                                        {onDelete && (
                                            <div
                                                className={bem('icon')}
                                                onClick={() => onDelete(item)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 -960 960 960"
                                                    width="24px"
                                                >
                                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <Hr />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}
