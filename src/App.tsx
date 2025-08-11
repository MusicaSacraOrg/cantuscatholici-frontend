import { ExampleComponent } from './components/exampleComponent/ExampleComponent';
import { NotificationsContextProvider } from '@musica-sacra/notifications';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { LayoutWithSidebar } from '@musica-sacra/layout';

export function App() {
    return (
        <div className="App">
            <NotificationsContextProvider>
                <Navbar />
                <LayoutWithSidebar
                    isPageLayout={true}
                    sidebar={<div>Here will be sidebar</div>}
                >
                    <ExampleComponent title={'Cantus Catholici'} />
                </LayoutWithSidebar>
                <Footer />
            </NotificationsContextProvider>
        </div>
    );
}
