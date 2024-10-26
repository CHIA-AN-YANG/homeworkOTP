import { useEffect } from 'react';
import { useUserActions } from '../store/actions/userActions';
import { useUser } from '../store/hooks/useUser';

const UserProfile = () => {
  const user = useUser();
  const { getUser, logoutUser } = useUserActions();

  useEffect(() => {
    getUser();
  }, []);

  if (user.loading) return <div>Loading...</div>;
  if (user.error) return <div>Error: {user.error}</div>;

  return (
    <div>
      <h1>{user.username}</h1>
      <img src={user.photo} alt={user.username} />
      <p>{user.quote}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default UserProfile;