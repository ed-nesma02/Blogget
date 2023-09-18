import Markdown from 'markdown-to-jsx';
import {Text} from '../../../UI/Text';
import {Date} from '../../Main/List/Post/Date/Date';
import style from './Comments.module.css';
import PropTypes from 'prop-types';

export const Comments = ({author, comment, date}) => {
  console.log();
  return (
    <ul className={style.list}>
      <li className={style.item}>
        <Text As="h3" className={style.author} size={18} tsize={22}>
          {author}
        </Text>
        <Text As="p" className={style.comment} size={14} tsize={18}>
          <Markdown
            options={{
              overrides: {
                a: {
                  props: {
                    taarget: '_blank',
                  },
                },
              },
              forceInline: true,
            }}
          >
            {comment}
          </Markdown>
        </Text>
        <Date date={date} />
      </li>
    </ul>
  );
};

Comments.propTypes = {
  author: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.number,
};
