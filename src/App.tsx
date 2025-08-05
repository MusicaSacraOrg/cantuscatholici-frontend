import { ExampleComponent } from './components/exampleComponent/ExampleComponent';
import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <Navbar />
                <ExampleComponent title={'Cantus Catholici'} />
                <Footer />
            </NotificationsContextProvider>
        </div>
    );
}
