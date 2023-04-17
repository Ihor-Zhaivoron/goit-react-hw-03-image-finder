import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const API = 'https://pixabay.com/api/?key=30885562-a2eefab65b39820f24403263b';

export class App extends Component {
  state = {
    images: [],
    activeImg: null,
    status: 'blank',
    searchText: '',
    page: 1,
    totalPages: 1,
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
          totalPages: Math.ceil(data.totalHits / 20),
        }));
      });
  };

  onSubmit = searchText => {
    this.setState({ searchText: searchText, page: 1, images: [] });
  };

  onImgClick = image => {
    this.setState({ activeImg: image });
  };

  onClickNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, activeImg, status, searchText, page, totalPages } = this;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onImgClick={this.onImgClick}
          />
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolve' && images.length > 0 && page !== totalPages && (
          <Button onClickNextPage={this.onClickNextPage} />
        )}

        {status === 'resolve' && images.length === 0 && (
          <p className="message">Not found this {searchText}</p>
        )}
        {activeImg && (
          <Modal
            activeImg={this.state.activeImg}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}
