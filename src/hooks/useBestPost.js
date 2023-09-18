import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useSelector} from 'react-redux';

export const useBestPost = () => {
  const [bestPosts, setBestPosts] = useState({});
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
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
      .then(({data}) => {
        setBestPosts(data?.children);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [token]);
  return [bestPosts];
};
