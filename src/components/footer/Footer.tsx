import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../hr/Hr';
import { Link } from 'react-router';

export function Footer() {
    const { bem } = useBem('footer');

    return (
        <div className={bem()}>
            <div className={bem('content')}>
                <div className={bem('content-top')}>
                    <div className={bem('content-column')}>
                        <a
                            className={bem('logo')}
                            href={'musicasacraorg.sk'}
                            target={'_blank'}
                            rel="noreferrer"
                        >
                            MusicaSacraOrg
                        </a>
                    </div>
                    <div className={bem('content-column')}>
                        <h3>Kontakt</h3>
                        <ul>
                            <li>info@musicasacra.sk</li>
                            <li>+421 918 958 527</li>
                        </ul>
                    </div>
                    <div className={bem('content-column')}>
                        <h3>Zdroje</h3>
                        <ul>
                            <li>info@musicasacra.sk</li>
                            <li>+421 918 958 527</li>
                        </ul>
                    </div>
                </div>
                <Hr />
                <div className={bem('links')}>
                    <Link to={''}>Piesne</Link>
                    <Link to={''}>Liturgický kalendár</Link>
                </div>
                <Hr />
                <div className={bem('copyrights')}>
                    Všetky práva vyhradené © MusicaSacraOrg
                </div>
            </div>
        </div>
    );
}
