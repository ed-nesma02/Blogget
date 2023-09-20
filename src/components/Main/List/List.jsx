import {
  ThreeDotsPreloader
} from '../../../UI/ThreeDotsPreloader/ThreeDotsPreloader';
import {usePostsData} from '../../../hooks/usePostsData';
import style from './List.module.css';
import Post from './Post';
import {useSelector} from 'react-redux';

export const List = () => {
  const [bestPosts] = usePostsData();
  const status = useSelector((state) => state.postsData.status);
  const statusAuth = useSelector((state) => state.auth.status);

  return (
    <>
      {(status === 'loading' && statusAuth !== 'idle') &&
        <ThreeDotsPreloader />}
      {status === 'error' && <p>Ошибка</p>}
      {status === 'loaded' && (
        <ul className={style.list}>
          {bestPosts?.map(({data}) => (
            <Post key={data.id} postData={data} />
          ))}
        </ul>
      )}
    </>
  );
};
