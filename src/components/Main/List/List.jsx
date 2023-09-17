import {useContext} from 'react';
import style from './List.module.css';
import Post from './Post';
import {postsContext} from '../../../context/postsContext';

export const List = () => {
  const {bestPosts} = useContext(postsContext);

  return bestPosts.length && (
    <ul className={style.list}>
      {bestPosts?.map(({data}) => (
        <Post key={data.id} postData={data} />
      ))}
    </ul>
  );
};
