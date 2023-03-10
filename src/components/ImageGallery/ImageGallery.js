import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      {images.map(({ id, tag, smallImage, largeImage }) => {
        return (
          <ImageGalleryItem
            key={id}
            tag={tag}
            smallImage={smallImage}
            largeImage={largeImage}
            openModal={openModal}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tag: PropTypes.string.isRequired,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
