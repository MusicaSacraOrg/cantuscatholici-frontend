import { ExampleComponent } from './components/exampleComponent/ExampleComponent';
import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Footer } from './components/footer/Footer';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <ExampleComponent title={'Cantus Catholici'} />
                <Footer />
            </NotificationsContextProvider>
        </div>
    );
}
