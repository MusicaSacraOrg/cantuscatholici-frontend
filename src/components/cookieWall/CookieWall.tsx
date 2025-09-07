import { Button } from '@musica-sacra/forms';
import '@musica-sacra/forms/dist/components/button/button.scss';
import { useBem } from '@musica-sacra/hooks';
import './cookiewall.scss';

export function CookieWall() {
    const { bem } = useBem('cookie-wall');
    return (
        <div className={bem()}>
            <div className={bem('container')}>
                <div className={bem('text')}>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis eveniet nam sunt culpa! Reiciendis neque
                        ratione assumenda blanditiis similique autem dolores ut
                        earum at eveniet nemo laudantium, nihil sint a.
                    </span>
                    <ul>
                        <li>Deliver and maintain Google services</li>
                        <li>
                            Track outages and protect against spam, fraud, and
                            abuse
                        </li>
                        <li>
                            Measure audience engagement and site statistics to
                            understand how our services are used and enhance the
                            quality of those services
                        </li>
                    </ul>
                </div>
                <div className={bem('buttons')}>
                    <Button>Reject</Button>
                    <Button>Accept</Button>
                </div>
            </div>
        </div>
    );
}
