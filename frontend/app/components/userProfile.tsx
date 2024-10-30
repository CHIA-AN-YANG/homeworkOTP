"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUser, selectStatus } from '../store/features/user/selectors/authSelectors';
import { EntityStatus } from '../config/model';
import { useRouter } from 'next/navigation';
import { loadUser, logoutUser } from '../store/features/user/actions/userActions';

const UserProfile = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  if (status === EntityStatus.LOADING || status === EntityStatus.IDLE) return <div className="loader"></div>;

  if (status === EntityStatus.SUCCESS) {
    return (
      <div className='user-profile-panel'>
        {user && <>
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

        </>}
      </div>
    );
  }
};

export default UserProfile;