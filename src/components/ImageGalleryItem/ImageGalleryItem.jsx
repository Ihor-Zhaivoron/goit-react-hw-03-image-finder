import css from './ImageGalleryItem.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ images, onImgClick }) {
  return (
    <>
      {images.map(image => (
        <li
          key={nanoid()}
          className={css.ImageGalleryItem}
          onClick={() => onImgClick(image)}
        >
          <img
            src={image.webformatURL}
            className={css.ImageGalleryItem_image}
            alt={image.tags}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
  onImgClick: PropTypes.func,
};
