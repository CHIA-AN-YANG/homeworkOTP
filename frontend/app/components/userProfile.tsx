"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUser, selectStatus } from '../store/features/user/selectors/authSelectors';
import { EntityStatus } from '../model/model';
import { useRouter } from 'next/navigation';
import { loadUser, logoutUser } from '../store/features/user/actions/userActions';

const UserProfile = () => {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    status === EntityStatus.ERROR && router.push('/');
  }, [status, router]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  if (!isClient) return null;

  if (status === EntityStatus.LOADING || status === EntityStatus.IDLE) return (
    <>
      <div className="loader"></div>
      <p>{(status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "waiting..."}</p>
    </>
  );

  if (status === EntityStatus.SUCCESS) {
    if (!user) return <div className="loader"></div>;
    return (
      <div className='user-profile-panel'>
        {user &&
          <>
            <section className='left-panel' style={!imageLoaded ? { filter: 'brightness(0.5)' } : {}}>
              <Image
                src={user.photo}
                alt={user.username + "\'s photo"}
                width={400}
                height={253}
                placeholder='empty'
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </section>
            <section className='right-panel'>
              <h2 className='welcome-txt'>Welcome, {user.username}!</h2>

              <p>{user.quote}</p>
              <div className='ctas'>
                <a className='primary' onClick={() => handleLogout()}>Logout</a>
              </div>
            </section>
          </>
        }
      </div >
    );
  }
};

export default UserProfile;