import { Link, Route, Routes } from 'react-router';
import { Paths } from '../paths';
import { NotFoundView } from '../../views/notFoundView/NotFoundView';

export function SongRouter() {
    return (
        <Routes>
            <Route
                path={Paths.SONG_DETAIL_SHEETS}
                element={<div>Sheets</div>}
            />
            <Route
                path={Paths.SONG_DETAIL_HYMNOLOGY}
                element={<div>hymnlogy</div>}
            />
            <Route
                path={Paths.SONG_DETAIL_EVENTS}
                element={<div>events</div>}
            />
            <Route
                path={Paths.SONG_DETAIL_RELATED}
                element={<div>related</div>}
            />
            <Route
                path={Paths.SONG_DETAIL_ARRANGEMENTS}
                element={
                    <div>
                        <Link to={'/song/1/arrangements/1'}>arangement</Link>
                    </div>
                }
            />
            <Route
                path={Paths.SONG_DETAIL_ARRANGEMENTS_DETAIL}
                element={<div>Arangement detail</div>}
            />

            <Route path={'*'} element={<NotFoundView />} />
        </Routes>
    );
}
