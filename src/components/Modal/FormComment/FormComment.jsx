import {useContext, useEffect, useRef, useState} from 'react';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';
import {authContext} from '../../../context/authContext';

export const FormComment = () => {
  const {auth} = useContext(authContext);
  const newMessageRef = useRef('');
  const [isOpenFormComment, setIsOpenFormComment] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMessageRef.current.value);
    newMessageRef.current.value = '';
  };

  useEffect(() => {
    if (isOpenFormComment) {
      newMessageRef.current.focus();
    }
  }, [isOpenFormComment]);

  return isOpenFormComment ? (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>
        {auth.name}
      </Text>
      <textarea className={style.textarea} ref={newMessageRef}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  ) : (
    <button
      className={style.btn}
      onClick={() => {
        setIsOpenFormComment(true);
      }}
    >
      Написать комментарий
    </button>
  );
};
