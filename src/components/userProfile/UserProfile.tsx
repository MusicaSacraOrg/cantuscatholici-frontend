import { useBem } from '@musica-sacra/hooks';
import { useState, useContext } from 'react';
import { ProfileHeader } from '../profileHeader/ProfileHeader';
import { UserDetail } from '../../models/user';
import {
    NotificationsContext,
    NotificationTypes,
} from '@musica-sacra/notifications';
import './userProfile.scss';

type UserProfileProps = {
    user: UserDetail;
};

export function UserProfile({ user }: UserProfileProps) {
    const { bem } = useBem('user-profile');
    const [showNumber, setShowNumber] = useState(false);
    const { addNotification } = useContext(NotificationsContext);

    const handleCopyNumber = async () => {
        try {
            await navigator.clipboard.writeText(user.mobile);
            addNotification(
                'Tel. číslo skopírované',
                NotificationTypes.SUCCESS
            );
        } catch (e) {
            console.error('Failed to copy number:', e);
            addNotification('Kopírovanie zlyhalo', NotificationTypes.ERROR);
        }
    };

    return (
        <div className={bem()}>
            <div className={bem('inner')}>
                <div className={bem('avatar')} aria-hidden>
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={`${user.name} ${user.surname}`}
                            className={bem('avatar-img')}
                            onError={(e) => {
                                // hide broken image and keep placeholder background
                                (
                                    e.currentTarget as HTMLImageElement
                                ).style.display = 'none';
                            }}
                        />
                    ) : null}
                </div>

                <div className={bem('main')}>
                    <ProfileHeader
                        name={user.name}
                        surname={user.surname}
                        role={user.role}
                    />

                    <p className={bem('email')}>{user.email}</p>

                    <div className={bem('mobile')}>
                        {!showNumber ? (
                            <button
                                className={bem('show-number')}
                                onClick={() => setShowNumber(true)}
                            >
                                Zobraziť tel. číslo
                            </button>
                        ) : (
                            <>
                                <span className={bem('mobile-number')}>
                                    {user.mobile}
                                </span>
                                <button
                                    className={bem('copy-number')}
                                    onClick={handleCopyNumber}
                                    aria-label="Kopírovať telefónne číslo"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        width="20"
                                        fill="currentColor"
                                    >
                                        <rect
                                            fill="none"
                                            height="24"
                                            width="24"
                                        />
                                        <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <p className={bem('description')}>{user.description}</p>
        </div>
    );
}
