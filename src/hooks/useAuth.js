import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store';

export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const token = useSelector((state) => state.token);
  const dispath = useDispatch();

  const unAuth = () => {
    dispath(deleteToken());
    location.href = '/';
  };

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch((err) => {
        console.error(err.message);
        setAuth({});
        if (err.message === '401') {
          unAuth();
        }
      });
  }, [token]);
  return [auth, unAuth];
};
