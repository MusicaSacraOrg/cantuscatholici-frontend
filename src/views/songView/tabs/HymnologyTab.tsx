import { useContext } from 'react';
import { SongContext } from '../SongView';
import { useBem } from '@musica-sacra/hooks';
import { Tag } from '../../../components/tag/Tag';

export function HymnologyTab() {
    const song = useContext(SongContext);
    const { bem } = useBem('hymnology-tab');

    if (!song) return null;

    // Group tags by category
    const tagsByCategory = song.tags.reduce(
        (acc, tag) => {
            const key = tag.categoryName;
            if (!acc[key]) acc[key] = { color: tag.categoryColor, tags: [] };
            acc[key].tags.push(tag);
            return acc;
        },
        {} as Record<string, { color: string; tags: typeof song.tags }>,
    );

    return (
        <div className={bem()}>
            <h2>Hymnológia</h2>

            {song.description && (
                <div className={bem('description')}>
                    <h3>Popis</h3>
                    <p>{song.description}</p>
                </div>
            )}

            {song.authorName && (
                <div className={bem('author')}>
                    <h3>Autor</h3>
                    <p>{song.authorName}</p>
                </div>
            )}

            {song.tags.length > 0 && (
                <div className={bem('tags')}>
                    <h3>Tagy</h3>
                    {Object.entries(tagsByCategory).map(
                        ([categoryName, { color, tags }]) => (
                            <div key={categoryName} className={bem('tag-group')}>
                                <h4>{categoryName}</h4>
                                <div className={bem('tag-list')}>
                                    {tags.map((tag) => (
                                        <Tag
                                            key={tag.id}
                                            name={tag.name}
                                            color={color}
                                        />
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}

            {song.addedAt && (
                <div className={bem('meta')}>
                    <p>
                        Pridané:{' '}
                        {new Date(song.addedAt).toLocaleDateString('sk-SK')}
                    </p>
                    {song.lastEditAt && (
                        <p>
                            Posledná úprava:{' '}
                            {new Date(song.lastEditAt).toLocaleDateString(
                                'sk-SK',
                            )}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
