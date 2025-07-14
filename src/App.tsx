import { ExampleComponent } from './components/exampleComponent/ExampleComponent';
import { Dummy } from '@musica-sacra/dummy';

export function App() {
    return (
        <div className="App">
            <ExampleComponent title={'Cantus Catholici'} />
            <Dummy dummyText={'Cantus Catholici dummy'} />
        </div>
    );
}
