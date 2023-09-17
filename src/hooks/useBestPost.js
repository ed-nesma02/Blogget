import {useContext, useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useBestPost = () => {
  const [bestPosts, setBestPosts] = useState({});
  const {token} = useContext(tokenContext);

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
        console.log(data);
        setBestPosts(data?.children);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [token]);
  return [bestPosts];
};
