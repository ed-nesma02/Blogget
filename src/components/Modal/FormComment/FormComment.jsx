import {useContext, useRef} from 'react';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';
import {authContext} from '../../../context/authContext';

export const FormComment = () => {
  const {auth} = useContext(authContext);
  const newMessageRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMessageRef.current.value);
    newMessageRef.current.value = '';
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>
        {auth.name}
      </Text>
      <textarea className={style.textarea} ref={newMessageRef}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
