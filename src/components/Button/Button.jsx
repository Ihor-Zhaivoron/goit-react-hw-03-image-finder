import css from './Button.module.css';
import PropTypes from 'prop-types';

export function Button({ onClickNextPage }) {
  return (
    <button type="button" className={css.Button} onClick={onClickNextPage}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClickNextPage: PropTypes.func,
};
