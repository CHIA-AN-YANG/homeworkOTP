"use client";
import Image from "next/image";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { loadUser, getAuth } from '../store/features/user/actions/authActions';
import { selectUser, selectStatus } from '../store/features/user/selectors/authSelectors';

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const loading = useSelector(selectStatus) === 'loading';

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogin = (code: string) => {
    dispatch(getAuth(code));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <Image
            src={user.photo}
            alt={user.username + "\'s photo"}
            width={180}
            height={100}
            priority
          />
          <p>{user.quote}</p>
        </div>
      ) : (
        <div>
          <h1>Not logged in</h1>
          <button onClick={() => handleLogin('1234')}>Login</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;