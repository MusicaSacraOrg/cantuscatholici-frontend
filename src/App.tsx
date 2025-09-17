import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { MainRouter } from './router/routers/MainRouter';
import { CookieWall } from './components/cookieWall/CookieWall';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <Navbar />

                <MainRouter />

                <CookieWall />

                <Footer />
            </NotificationsContextProvider>
        </div>
    );
}
