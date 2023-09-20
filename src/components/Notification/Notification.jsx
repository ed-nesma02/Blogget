import style from './Notification.module.css';
import cn from 'classnames';
import ReactDOM from 'react-dom';

export const Notification = () =>
  ReactDOM.createPortal(
    <div
      className={cn(style.notify, style.bottomRight, style.doShow)}
      data-notification-status="error"
    >
      При авторизации произошла ошибка
    </div>,
    document.getElementById('notice-root')
  );
