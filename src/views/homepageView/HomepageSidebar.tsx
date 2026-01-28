import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../../components/hr/Hr';
import { Tag } from '../../components/tag/Tag';
import { SortFilters } from '../../components/sortFilters/SortFilters';
import { TagCategory } from '../../models/tag';
import { useGetList } from '@musica-sacra/api';
import { Loader } from '@musica-sacra/loader';
import { mockedTagCategories } from './mockedData';

export function HomepageSidebar() {
    const { bem } = useBem('homepage-sidebar');

    const { query } = useGetList('/mocks/tagCategories.json', 'tagCategories');

    return (
        <div className={bem()}>
            <SortFilters />
            <Hr />
            <div className={bem('tag-groups')}>
                {/*{mockedTagCategories.tagCategories.map(*/}
                {/*    (category: TagCategory) => (*/}
                {/*<Loader loading={query.isLoading}>*/}
                {/*    {query.data?.items?.map((category: any) => (*/}
                {/*        <div*/}
                {/*            key={category.name}*/}
                {/*            className={bem('tag-category')}*/}
                {/*        >*/}
                {/*            <h4>{category.name}</h4>*/}
                {/*            <div className={bem('tag-category-tags')}>*/}
                {/*                {category.tags.map((tag) => (*/}
                {/*                {category.tags.map((tag: any) => (*/}
                {/*                    <Tag*/}
                {/*                        key={tag.id}*/}
                {/*                        name={tag.name}*/}
                {/*                        color={'default'}*/}
                {/*                    />*/}
                {/*                ))}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*)}*/}
                {/*</Loader>*/}
                {/*            )*/}
            </div>
        </div>
    );
}
