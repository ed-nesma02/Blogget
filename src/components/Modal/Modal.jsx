import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {Comments} from './Comments/Comments';
import {Text} from '../../UI/Text';
import {FormComment} from './FormComment/FormComment';

export const Modal = ({id, closeModal}) => {
  const overlayRef = useRef(null);
  const [dataPost, comments] = useCommentsData(id);

  const handleClick = (e) => {
    const target = e.target;
    const code = e.code;
    if (target === overlayRef.current || code === 'Escape') {
      closeModal();
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
        {Object.keys(dataPost).length ? (
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
              comments?.map(({data}) => (
                <Comments
                  key={data.id}
                  author={data.author}
                  comment={data.body}
                  date={data.created}
                />
              ))
            ) : (
              <Text As="p">Нет коментариев</Text>
            )}
            <button className={style.close} onClick={closeModal}>
              <CloseIcon />
            </button>
          </>
        ) : (
          <Text As="p">Загрузка...</Text>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
