import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Navbar } from './components/navbar/Navbar';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <Navbar />
            </NotificationsContextProvider>
        </div>
    );
}
