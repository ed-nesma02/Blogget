import {SVG} from '../../../UI/SVG/SVG';
import style from './Logo.module.css';
import path from './img/logo.svg';

export const Logo = () => (
  <a href="/" className={style.link}>
    <SVG path={path} id='logo' width={128} height={128}/>
  </a>
);
