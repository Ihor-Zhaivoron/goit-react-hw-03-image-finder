// import css from './App.module.css';

import { Component } from 'react';
// import { Button } from './Button/Button';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
// import { Searchbar } from './Searchbar/Searchbar';

const API = 'https://pixabay.com/api/?key=30885562-a2eefab65b39820f24403263b';

export class App extends Component {
  state = {
    images: [],
    activeImg: null,
    status: 'blank',
    searchText: '',
    page: 1,
    totalPage: 1,
  };
  onCloseModal = () => {
    this.setState({ activeImg: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      this.getApiQuery();
    }
  }

  getApiQuery = () => {
    this.setState({ status: 'pending' });
    fetch(`${API}&q={this.this.state.searchText}&page={this.state.page}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          items: [...prevState.images, ...data.hits],
          status: 'resolve',
          totalPage: Math.ceil(data.totalHits / 20),
        }));
      });
  };

  render() {
    return;
  }
}
