import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Tag } from '../../components/tag/Tag';
import { mockedTagCategories } from './mockedData';
import { SortFilters } from '../../components/sortFilters/SortFilters';
import { TagCategory } from '../../models/tag';

export function HomepageSidebar() {
    const { bem } = useBem('homepage-sidebar');

    return (
        <div className={bem()}>
            <SortFilters />
            <Hr />
            <div className={bem('tag-groups')}>
                {mockedTagCategories.tagCategories.map(
                    (category: TagCategory) => (
                        <div
                            key={category.name}
                            className={bem('tag-category')}
                        >
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
                    )
                )}
            </div>
        </div>
    );
}
