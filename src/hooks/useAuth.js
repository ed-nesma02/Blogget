import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authRequestAsync} from '../store/auth/authAction';
import {deleteToken} from '../store/tokenReducer';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth.data);
  const token = useSelector((state) => state.token.token);
  const status = useSelector((state) => state.auth.status);
  const dispath = useDispatch();

  const unAuth = () => {
    dispath(deleteToken());
    location.href = '/';
  };

  useEffect(() => {
    dispath(authRequestAsync());
  }, [token]);
  return [auth, status, unAuth];
};
