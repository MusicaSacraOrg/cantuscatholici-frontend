import { King } from '@musica-sacra/layout';
import { SongRouter } from '../../router/routers/SongRouter';
import { SongNavigation } from './SongNavigation';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SongEndpoints } from '../../api/song/SongEndpoints';
import { SongDetail } from '../../models/song';
import { createContext } from 'react';
import { Loader } from '@musica-sacra/loader';

export const SongContext = createContext<SongDetail | null>(null);

export function SongView() {
    const { id } = useParams<{ id: string }>();

    const { data: song, isLoading } = useQuery({
        queryKey: ['song', id],
        queryFn: async () => {
            const response = await axios.get<SongDetail>(
                SongEndpoints.getSong(id!)
            );
            return response.data;
        },
        enabled: !!id,
    });

    return (
        <King
            leftSidebar={<SongNavigation songId={id || ''} />}
            rightSidebar={<div></div>}
            isPageLayout={true}
        >
            <Loader loading={isLoading}>
                <SongContext.Provider value={song || null}>
                    <SongRouter />
                </SongContext.Provider>
            </Loader>
        </King>
    );
}
