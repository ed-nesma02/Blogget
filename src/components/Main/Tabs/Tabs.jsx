import {useEffect, useState} from 'react';
import style from './Tabs.module.css';
import {assignId} from '../../../utils/generateRandomId';
import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';
import {debounceRaf} from '../../../utils/debounce';
import {Text} from '../../../UI/Text';
import {useNavigate} from 'react-router-dom';

const LIST = [
  {value: 'Главная', Icon: HomeIcon, link: 'rising'},
  {value: 'Топ', Icon: TopIcon, link: 'top'},
  {value: 'Лучшие', Icon: BestIcon, link: 'best'},
  {value: 'Горячие', Icon: HotIcon, link: 'hot'},
].map(assignId);

export const Tabs = () => {
  const [idDropdownOpen, setIdDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [textButton, setTextButton] = useState('Главная');
  const navigate = useNavigate();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  const changeButton = (value) => {
    setTextButton(value);
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => window.removeEventListener('resize', debounceResize);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapperBtn}>
        {isDropdown && (
          <button
            className={style.btn}
            onClick={() => setIdDropdownOpen(!idDropdownOpen)}
          >
            {textButton}
            <ArrowIcon width={15} height={15} />
          </button>
        )}
      </div>
      {(idDropdownOpen || !isDropdown) && (
        <ul className={style.list} onClick={() => setIdDropdownOpen(false)}>
          {LIST.map(({value, id, Icon, link}) => (
            <Text As="li" className={style.item} key={id}>
              <button
                className={style.btn}
                onClick={() => {
                  changeButton(value);
                  navigate(`/category/${link}`);
                }}
              >
                {value}
                {Icon && <Icon width={30} height={30} />}
              </button>
            </Text>
          ))}
        </ul>
      )}
    </div>
  );
};
