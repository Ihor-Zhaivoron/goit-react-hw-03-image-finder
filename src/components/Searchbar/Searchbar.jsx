import { Component } from 'react';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleInput = e => {
    e.preventDefault();
    if (this.state.input.trim() !== '') {
      this.props.onSubmit(this.state.input.trim());
      this.setState({ input: '' });
    }
  };
  handleChange = e => {
    this.setState({ input: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleInput}>
          <button type="submit" className={css.SearchForm_button}>
            <AiOutlineSearch />
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
