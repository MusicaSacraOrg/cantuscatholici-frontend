import { Route, Routes } from 'react-router';
import { Paths } from '../paths';
import { NotFoundView } from '../../views/notFoundView/NotFoundView';
import { SheetsTab } from '../../views/songView/tabs/SheetsTab';
import { HymnologyTab } from '../../views/songView/tabs/HymnologyTab';
import { EventsTab } from '../../views/songView/tabs/EventsTab';
import { RelatedTab } from '../../views/songView/tabs/RelatedTab';
import { ArrangementsTab } from '../../views/songView/tabs/ArrangementsTab';

export function SongRouter() {
    return (
        <Routes>
            <Route
                path={Paths.SONG_DETAIL_SHEETS}
                element={<SheetsTab />}
            />
            <Route
                path={Paths.SONG_DETAIL_HYMNOLOGY}
                element={<HymnologyTab />}
            />
            <Route
                path={Paths.SONG_DETAIL_EVENTS}
                element={<EventsTab />}
            />
            <Route
                path={Paths.SONG_DETAIL_RELATED}
                element={<RelatedTab />}
            />
            <Route
                path={Paths.SONG_DETAIL_ARRANGEMENTS}
                element={<ArrangementsTab />}
            />
            <Route
                path={Paths.SONG_DETAIL_ARRANGEMENTS_DETAIL}
                element={<div>Detail úpravy - čoskoro</div>}
            />

            <Route path={'*'} element={<NotFoundView />} />
        </Routes>
    );
}
