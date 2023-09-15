import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useToken} from './useToken';

export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const [token, delToken] = useToken('');

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch((err) => {
        console.error(err);
        setAuth({});
        delToken();
      });
  }, [token]);
  return [auth, delToken];
};
