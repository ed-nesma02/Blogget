import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsDataRequestAsync} from '../store/postsData/postsDataAction';

export const usePostsData = () => {
  const bestPosts = useSelector((state) => state.postsData.data);
  const token = useSelector((state) => state.token.token);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(postsDataRequestAsync());
  }, [token]);
  return [bestPosts];
};
