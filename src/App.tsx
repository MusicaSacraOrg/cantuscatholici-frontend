import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { MainRouter } from './router/routers/MainRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/userContext/UserContextProvider';

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <NotificationsContextProvider>
                    <div className="App">
                        <Navbar />

                        <MainRouter />

                        <Footer />
                    </div>
                </NotificationsContextProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
