import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Tag } from '../../components/tag/Tag';
import { SortFilters } from '../../components/sortFilters/SortFilters';
import { TagCategory } from '../../models/tag';
import { Loader } from '@musica-sacra/loader';
import { TagCategoryEndpoints } from '../../api/tag_category/TagCategoryEndpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUrlParams } from './useUrlParams';

export function HomepageSidebar() {
    const { bem } = useBem('homepage-sidebar');
    const { getParams, setParams } = useUrlParams();

    const params = getParams();
    const activeTags = params.tags
        ? params.tags.split(',').map(Number)
        : [];

    const { data: categories, isLoading } = useQuery({
        queryKey: ['tagCategoriesWithTags'],
        queryFn: async () => {
            const response = await axios.get<TagCategory[]>(
                TagCategoryEndpoints.getTagCategoriesWithTags()
            );
            return response.data;
        },
    });

    const toggleTag = (tagId: number) => {
        const current = new Set(activeTags);
        if (current.has(tagId)) {
            current.delete(tagId);
        } else {
            current.add(tagId);
        }
        const newTags =
            current.size > 0
                ? Array.from(current).join(',')
                : null;
        setParams({ tags: newTags });
    };

    return (
        <div className={bem()}>
            <SortFilters />
            <Hr />
            <div className={bem('tag-groups')}>
                <Loader loading={isLoading}>
                    {categories?.map((category: TagCategory) => (
                        <div
                            key={category.id}
                            className={bem('tag-category')}
                        >
                            <h4>{category.name}</h4>
                            <div className={bem('tag-category-tags')}>
                                {category.tags.map((tag) => (
                                    <Tag
                                        key={tag.id}
                                        name={tag.name}
                                        color={category.color}
                                        active={activeTags.includes(tag.id)}
                                        onClick={() => toggleTag(tag.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </Loader>
            </div>
        </div>
    );
}
