import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userAtom';

export const useUser = () => {
  const user = useRecoilValue(userState);
  return user;
};