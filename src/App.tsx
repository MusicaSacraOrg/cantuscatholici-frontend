import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { MainRouter } from './router/routers/MainRouter';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <Navbar />

                <MainRouter />

                <Footer />
            </NotificationsContextProvider>
        </div>
    );
}
