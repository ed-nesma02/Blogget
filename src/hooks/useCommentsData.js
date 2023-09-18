import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

export const useCommentsData = (id) => {
  const [comments, setComments] = useState([]);
  const [dataPost, setDataPost] = useState({});
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/comments/${id}`, {
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
      .then((data) => {
        setDataPost(data[0]?.data.children[0]?.data);
        setComments(data[1]?.data.children);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [token]);
  return [dataPost, comments];
};

useCommentsData.propTypes = {
  id: PropTypes.string,
};
