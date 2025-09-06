import { useBem } from '@musica-sacra/hooks';
import { Hr } from '../hr/Hr';
import { Link } from 'react-router';

export function Footer() {
    const { bem } = useBem('footer');

    return (
        <div className={bem()}>
            <div className={bem('content-wrapper')}>
                <div className={bem('content')}>
                    <div className={bem('column')}>
                        <a
                            className={bem('logo')}
                            href={'https://musicasacraorg.sk'}
                            target={'_blank'}
                            rel="noreferrer"
                        >
                            MusicaSacraOrg
                        </a>
                        <p>Lorem ipsum lorem ipsum, lorem ipsum, lorem ipsum</p>
                        <ul>
                            <li>info@musicasacra.sk</li>
                            <li>+421 918 958 527</li>
                        </ul>
                    </div>
                    <div className={bem('column')}>
                        <h3>Zdroje</h3>
                        <ul>
                            <li>Dokumentácia</li>
                            <li>O Projekte</li>
                        </ul>
                    </div>
                    <div className={bem('column')}>
                        <h3>Obsah</h3>
                        <ul>
                            <li>
                                <Link to={''}>Piesne</Link>
                            </li>
                            <li>
                                <Link to={''}>Liturgický kalendár</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Hr />
                <div className={bem('copyrights')}>
                    <div>
                        <p>Všetky práva vyhradené © MusicaSacraOrg</p>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link to={''}>Ochrana osobných údajov</Link>
                            </li>
                            <li>
                                <Link to={''}>Cookies</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
