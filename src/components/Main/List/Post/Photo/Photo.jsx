import style from './Photo.module.css';
import notphoto from './../img/notphoto.jpg';
import PropTypes from 'prop-types';

export const Photo = ({title}) => (
  <img className={style.img} src={notphoto} alt={title} />
);

Photo.propTypes = {
  title: PropTypes.string,
};
