import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router';
import './style.scss';
import { ScrollToTop } from './components/scrollToTop/ScrollToTop';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
);
