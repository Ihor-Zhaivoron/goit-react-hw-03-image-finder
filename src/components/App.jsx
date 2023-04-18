import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import ScrollToTop from 'react-scroll-to-top';

const API = 'https://pixabay.com/api/?key=30885562-a2eefab65b39820f24403263b';

export class App extends Component {
  state = {
    images: [],
    activeImg: null,
    status: 'blank',
    searchText: 'cat',
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
    fetch(`${API}&q=${this.state.searchText}&page=${this.state.page}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
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
    const { images, activeImg, status, searchText, page, totalPages } =
      this.state;
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
          <p className="message">Not found {searchText}</p>
        )}
        {activeImg && (
          <Modal
            activeImg={this.state.activeImg}
            onCloseModal={this.onCloseModal}
          />
        )}

        <ScrollToTop
          smooth
          color="#0519f5"
          viewBox="0 0 27 27"
          svgPath="M25.172 15.172c0 0.531-0.219 1.031-0.578 1.406l-1.172 1.172c-0.375 0.375-0.891 0.594-1.422 0.594s-1.047-0.219-1.406-0.594l-4.594-4.578v11c0 1.125-0.938 1.828-2 1.828h-2c-1.062 0-2-0.703-2-1.828v-11l-4.594 4.578c-0.359 0.375-0.875 0.594-1.406 0.594s-1.047-0.219-1.406-0.594l-1.172-1.172c-0.375-0.375-0.594-0.875-0.594-1.406s0.219-1.047 0.594-1.422l10.172-10.172c0.359-0.375 0.875-0.578 1.406-0.578s1.047 0.203 1.422 0.578l10.172 10.172c0.359 0.375 0.578 0.891 0.578 1.422z"
        />
      </div>
    );
  }
}
