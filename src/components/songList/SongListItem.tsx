import { useBem } from '@musica-sacra/hooks';
import { Link } from 'react-router';
import { useState } from 'react';
import { Tag } from '../tag/Tag';
import { Song } from '../../models/song';

type SongListItemProps = {
    song: Song;
};

export function SongListItem({ song }: SongListItemProps) {
    const { bem, base } = useBem('song-list_item');

    const [expanded, setExpanded] = useState(false);

    return (
        <div className={bem(base, { 'song-list_item--expanded': expanded })}>
            <div className={bem('summary')}>
                <div className={bem('title')}>
                    <Link to={'/song/1/sheets'}>{song.title}</Link>
                </div>
                <div className={bem('author')}>{song.author}</div>
                <div className={bem('hymnal')}>
                    {song.hymnalNumber}{' '}
                    {song.hymnalNumber && song.hymnal ? '-' : ''} {song.hymnal}
                </div>
                <div
                    onClick={() => setExpanded((prev) => !prev)}
                    className={bem('expand-button')}
                >
                    {expanded ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="rgba(8, 130, 170, 1)"
                        >
                            {/* Up arrow */}
                            <path d="M8.12 14.71 12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z" />
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
                            <path d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                        </svg>
                    )}
                </div>
            </div>
            <div className={bem('details')}>
                {song.tags?.map((tag: string) => (
                    <Tag key={tag} name={tag} color={''} />
                ))}
            </div>
        </div>
    );
}
