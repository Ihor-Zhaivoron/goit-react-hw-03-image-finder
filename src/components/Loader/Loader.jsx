import { Dna } from 'react-loader-spinner';
import css from './Loader.module.css';

export function Loader() {
  <div className={css.Loader}>
    <Dna
      visible={true}
      height="80"
      width="80"
      radius="9"
      color="orange"
      ariaLabel="dna-loading"
    />
  </div>;
}
