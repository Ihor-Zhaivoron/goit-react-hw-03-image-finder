import css from './Button.module.css';
import PropTypes from 'prop-types';

export function Button({ onClickNextPage }) {
  return (
    <Button
      type="button"
      className={css.Button}
      onClick={onClickNextPage}
    ></Button>
  );
}

Button.propTypes = {
  onClickNextPage: PropTypes.func,
};
