import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {Comments} from './Comments/Comments';
import {Text} from '../../UI/Text';
import {FormComment} from './FormComment/FormComment';
import {useSelector} from 'react-redux';
import {PuffPreloader} from '../../UI/PuffPreloader/PuffPreloader';
import {useNavigate, useParams} from 'react-router-dom';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const [dataPost, comments] = useCommentsData(id);
  const status = useSelector((state) => state.commentsData.status);

  const handleClick = (e) => {
    const target = e.target;
    const code = e.code;
    if (target === overlayRef.current || code === 'Escape') {
      navigate(`/category/${page}`);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && <PuffPreloader />}
        {status === 'error' && <p>Ошибка</p>}
        {status === 'loaded' && (
          <>
            <h2 className={style.title}>{dataPost?.title}</h2>

            <div className={style.content}>
              <Markdown
                options={{
                  overrides: {
                    a: {
                      props: {
                        taarget: '_blank',
                      },
                    },
                  },
                }}
              >
                {dataPost?.selftext}
              </Markdown>
            </div>

            <p className={style.author}>{dataPost?.author}</p>
            <FormComment />
            {comments.length !== 0 ? (
              comments?.map(
                ({data}) =>
                  data.body && (
                    <Comments
                      key={data.id}
                      author={data.author}
                      comment={data.body}
                      date={data.created}
                    />
                  )
              )
            ) : (
              <Text As="p">Нет коментариев</Text>
            )}
            <button
              className={style.close}
              onClick={() => {
                navigate(`/category/${page}`);
              }}
            >
              <CloseIcon />
            </button>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};
