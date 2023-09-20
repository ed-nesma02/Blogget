import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {commentsDataAsync} from '../store/commentsData/commentsDataAction';

export const useCommentsData = (id) => {
  const dataPost = useSelector((state) => state.commentsData.dataPost);
  const comments = useSelector((state) => state.commentsData.comments);
  const token = useSelector((state) => state.token.token);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(commentsDataAsync(id));
  }, [token]);
  return [dataPost, comments];
};

useCommentsData.propTypes = {
  id: PropTypes.string,
};
