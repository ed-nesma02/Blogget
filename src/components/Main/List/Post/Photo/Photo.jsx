import style from './Photo.module.css';
import notphoto from '../img/notphoto.jpg';
import PropTypes from 'prop-types';

export const Photo = ({title, thumbnail}) => (
  <img
    className={style.img}
    src={thumbnail}
    alt={title}
    style={{'--path-img': `url(${notphoto})`}}
  />
);

Photo.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
};
