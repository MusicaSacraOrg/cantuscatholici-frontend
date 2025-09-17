import { Button } from '@musica-sacra/forms';
import '@musica-sacra/forms/dist/components/button/button.scss';
import { useBem } from '@musica-sacra/hooks';
import { useCookiesConsent } from './useCookieConsent';

type CookieWallProps = {
    className?: string;
};

export function CookieWall({ className = '' }: CookieWallProps) {
    const { acceptCookiesConsent, rejectCookiesConsent, isCookiesConsentSet} = useCookiesConsent();

  if (isCookiesConsentSet) {
    return null;
  }

    const { bem, base } = useBem('ms-cookie-wall');

    return (
        <div className={bem(base, className)}>
            <div className={bem('container')}>
                <div className={bem('content')}>
                    <div className={bem('text')}>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Officiis eveniet nam sunt culpa! Reiciendis
                            neque ratione assumenda blanditiis similique autem
                            dolores ut earum at eveniet nemo laudantium, nihil
                            sint a.
                        </span>
                        <ul className={bem('list')}>
                            <li>Deliver and maintain Google services</li>
                            <li>
                                Track outages and protect against spam, fraud,
                                and abuse
                            </li>
                            <li>
                                Measure audience engagement and site statistics
                                to understand how our services are used and
                                enhance the quality of those services
                            </li>
                        </ul>
                    </div>
                    <div className={bem('buttons')}>
                        <Button rounded onClick={rejectCookiesConsent}>
                            Reject
                        </Button>
                        <Button rounded accent onClick={acceptCookiesConsent}>
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
