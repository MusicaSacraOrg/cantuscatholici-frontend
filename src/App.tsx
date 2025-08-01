import { ExampleComponent } from './components/exampleComponent/ExampleComponent';
import { NotificationsContextProvider } from '@musica-sacra/notifications';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <ExampleComponent title={'Cantus Catholici'} />
            </NotificationsContextProvider>
        </div>
    );
}
