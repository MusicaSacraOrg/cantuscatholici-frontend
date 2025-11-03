import { useBem } from '@musica-sacra/hooks';
import { Prince } from '@musica-sacra/layout';
import { useParams } from 'react-router';
import { useUserDetail } from '../../api/user/useUserDetail';
import { Loader } from '@musica-sacra/loader';
import { useState, useContext } from 'react';
import './UserDetailView.scss';
import {
  NotificationsContext,
  NotificationTypes,
} from '@musica-sacra/notifications';

export function UserDetailView() {
  const { bem } = useBem('view-user');
  const { id } = useParams<{ id?: string }>();
  const { data: user, isLoading, isError } = useUserDetail(id);
  const [showNumber, setShowNumber] = useState(false);
  const { addNotification } = useContext(NotificationsContext);

  const description =
    (user && (user.description || (user as any).descriptions)) || '';

  return (
    <Prince isPageLayout={true} className={bem()}>
      {isLoading && <Loader />}
      {isError && <div>Chyba pri načítaní používateľa</div>}
      {!isLoading && user && (
        <>
          <div className={bem('profile')}>
            <div className={bem('profile-inner')}>
              <div className={bem('avatar')} aria-hidden>
                {((user as any).avatar as string) ? (
                  <img
                    src={(user as any).avatar as string}
                    alt={`${user.name} ${user.surname}`}
                    className={bem('avatar-img')}
                    onError={(e) => {
                      // hide broken image and keep placeholder background
                      (e.currentTarget as HTMLImageElement).style.display =
                        'none';
                    }}
                  />
                ) : null}
              </div>

              <div className={bem('main')}>
                <div className={bem('profile-header')}>
                  <h1 className={bem('name')}>
                    {user.name} {user.surname}
                  </h1>
                  <h2 className={bem('role')}>{user.role}</h2>
                </div>

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
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(user.mobile);
                            addNotification(
                              'Tel. číslo skopírované',
                              NotificationTypes.SUCCESS,
                            );
                          } catch (e) {
                            addNotification(
                              'Kopírovanie zlyhalo',
                              NotificationTypes.ERROR,
                            );
                          }
                        }}
                        aria-label="Kopírovať telefónne číslo"
                      >
                        Kopírovať
                      </button>

                      <button
                        className={bem('hide-number')}
                        onClick={() => setShowNumber(false)}
                      >
                        Skryť číslo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <p className={bem('description')}>{description}</p>
          </div>
        </>
      )}
      {!isLoading && !user && !isError && <div>Používateľ nenájdený</div>}
    </Prince>
  );
}
