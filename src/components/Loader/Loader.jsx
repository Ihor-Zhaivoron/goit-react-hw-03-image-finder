import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export function Loader() {
  <div className={css.Loader}>
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      radius="9"
      color="#f50505"
      ariaLabel="ThreeDots-loading"
    />
  </div>;
}
