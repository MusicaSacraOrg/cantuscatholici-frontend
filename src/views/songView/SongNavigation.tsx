import { useBem } from '@musica-sacra/hooks';
import { NavLink } from 'react-router';

type SongNavigationProps = {
    songId: string;
};

export function SongNavigation({ songId }: SongNavigationProps) {
    const { bem } = useBem('song-navigation');

    return (
        <div className={bem()}>
            <div>
                <NavLink to={`/song/${songId}/sheets`}>Noty a text</NavLink>
                <NavLink to={`/song/${songId}/hymnology`}>Hymnológia</NavLink>
                <NavLink to={`/song/${songId}/events`}>Slávenia</NavLink>
                <NavLink to={`/song/${songId}/related`}>
                    Súvisiace piesne
                </NavLink>
            </div>
            <div>
                <NavLink to={`/song/${songId}/arrangements`}>
                    Úpravy a medzihry
                </NavLink>
            </div>
        </div>
    );
}
