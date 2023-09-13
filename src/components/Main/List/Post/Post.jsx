import style from './Post.module.css';
import PropTypes from 'prop-types';
import {Content} from './Content/Content';
import {Rating} from './Rating/Rating';
import {Photo} from './Photo/Photo';
import {Date} from './Date/Date';
import {Delete} from './Delete/Delete';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;

  return (
    <li className={style.post}>
      <Photo title={title} />
      <Content title={title} author={author} />
      <Rating ups={ups} />
      <Date date={date} />
      <Delete />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
