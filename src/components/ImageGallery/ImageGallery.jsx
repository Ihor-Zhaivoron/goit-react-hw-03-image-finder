import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes  from 'prop-types';

export function ImageGallery({ images, onImgClick }) {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem images={images} onImgClick={onImgClick} />
    </ul>
  );
}

ImageGallery.propTypes = {
  ImageGalleryItem: PropTypes.func,
};
