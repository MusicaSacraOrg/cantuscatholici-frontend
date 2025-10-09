import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { useState } from 'react';
import { Tag } from '../../components/tag/Tag';

const mockedData = {
    tagCategories: [
        {
            name: 'Obdobie',
            tags: [
                { id: 0, name: 'Intorit', category: 'casti-omse' },
                { id: 1, name: 'Offertorium', category: 'casti-omse' },
                { id: 2, name: 'Mariánske', category: 'prilezitosti' },
            ],
        },
        {
            name: 'Časti omše',
            tags: [
                { id: 0, name: 'Intorit', category: 'casti-omse' },
                { id: 1, name: 'Offertorium', category: 'casti-omse' },
                { id: 2, name: 'Mariánske', category: 'prilezitosti' },
                { id: 3, name: 'Offertorium', category: 'casti-omse' },
                { id: 4, name: 'Mariánske', category: 'prilezitosti' },
            ],
        },
    ],
};

export function HomepageSidebar() {
    const { bem } = useBem('homepage-sidebar');

    const [sortState, setSortState] = useState({
        orderName: 'alphabetical',
        order: 'ascending',
    });

    const renderArrow = (orderName: 'alphabetical' | 'numerical') => {
        const isActive = sortState.orderName === orderName;
        const isAscending = sortState.order === 'ascending';

        if (!isActive) return null;

        return (
            <>
                {isAscending ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="rgba(8, 130, 170, 1)"
                    >
                        {/* Up arrow */}
                        <path d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="rgba(8, 130, 170, 1)"
                    >
                        {/* Down arrow */}
                        <path d="M8.12 14.71 12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z" />
                    </svg>
                )}
            </>
        );
    };

    const handleFilterClick = (orderName: 'alphabetical' | 'numerical') => {
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
            <div className={bem('sort-filters')}>
                <div
                    className={bem('sort-filter', {
                        'homepage-sidebar__sort-filter--active':
                            sortState.orderName === 'alphabetical',
                    })}
                    onClick={() => handleFilterClick('alphabetical')}
                >
                    <div>A - B</div>
                    {renderArrow('alphabetical')}
                </div>
                <div
                    className={bem('sort-filter', {
                        'homepage-sidebar__sort-filter--active':
                            sortState.orderName === 'numerical',
                    })}
                    onClick={() => handleFilterClick('numerical')}
                >
                    <div>1 - 9</div>
                    {renderArrow('numerical')}
                </div>
            </div>
            <Hr />
            <div className={bem('tag-groups')}>
                {mockedData.tagCategories.map((category) => (
                    <div key={category.name} className={bem('tag-category')}>
                        <h4>{category.name}</h4>
                        <div className={bem('tag-category-tags')}>
                            {category.tags.map((tag) => (
                                <Tag
                                    key={tag.id}
                                    name={tag.name}
                                    color={'default'}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
