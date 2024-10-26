
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { defaultUserState, UserState, userState } from '../atoms/userAtom';

export const useUserActions = () => {
  const setUser = useSetRecoilState(userState);

  const getUser = async () => {
    try {
      setUser((prev) => ({ ...prev, loading: true, error: '' }));

      const response = await axios.get('/api/user');
      getUserSuccessful(response.data);
    } catch (error) {
      getUserFail(error instanceof Error ? error.message : 'Failed to fetch user');
    }
  };

  const getUserSuccessful = (userData: Omit<UserState, 'loading' | 'error'>) => {
    setUser({
      username: userData.username,
      quote: userData.quote,
      photo: userData.photo,
      loading: false,
      error: '',
    });
  };

  const getUserFail = (errorMessage: string) => {
    setUser((prev) => ({
      ...prev,
      loading: false,
      error: errorMessage,
    }));
  };

  const logoutUser = async () => {
    try {
      // TODO: api not implemented yet
      await axios.post('/api/logout');
      setUser(defaultUserState);
    } catch (error) {
      setUser((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to logout',
      }));
    }
  };

  return {
    getUser,
    getUserSuccessful,
    getUserFail,
    logoutUser,
  };
};