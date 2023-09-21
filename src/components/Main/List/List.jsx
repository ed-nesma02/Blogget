import {useEffect, useRef, useState} from 'react';
import {ThreeDotsPreloader
} from '../../../UI/ThreeDotsPreloader/ThreeDotsPreloader';
import style from './List.module.css';
import Post from './Post';
import {useDispatch, useSelector} from 'react-redux';
import {postsDataRequestAsync} from '../../../store/postsData/postsDataAction';
import {Outlet, useParams} from 'react-router-dom';
import {Text} from '../../../UI/Text';

export const List = () => {
  const post = useSelector((state) => state.postsData.data);
  const status = useSelector((state) => state.postsData.status);
  const statusAuth = useSelector((state) => state.auth.status);
  const isLast = useSelector((state) => state.postsData.isLast);
  const endList = useRef(null);
  const dispath = useDispatch();
  const [count, setCount] = useState(0);
  const {page} = useParams();

  useEffect(() => {
    setCount(0);
    dispath(postsDataRequestAsync(page));
  }, [page]);

  useEffect(() => {
    console.log(count);
    if (count > 2) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispath(postsDataRequestAsync());
        }
      },
      {
        rootMargin: '200px',
      }
    );
    observer.observe(endList.current);
    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, count]);

  useEffect(() => {
    if (status === 'loaded') {
      setCount(count + 1);
    }
  }, [post.length]);

  return (
    <>
      {status === 'loading' && statusAuth !== 'idle' && <ThreeDotsPreloader />}
      {status === 'error' && <p>Ошибка</p>}
      <ul className={style.list}>
        {status === 'loaded' &&
          post?.map(({data}) => <Post key={data.id} postData={data} />)}
        <li ref={endList} className={style.end} />
      </ul>
      {count > 2 && !isLast && (
        <button
          onClick={() => {
            setCount(count - 1);
          }}
          className={style.btn}
        >
          Загрузить еще
        </button>
      )}
      <Outlet />
      {isLast && (
        <Text As="p" size={22} tsize={24} color="orange" center={true}>
          Постов больше нет
        </Text>
      )}
    </>
  );
};
