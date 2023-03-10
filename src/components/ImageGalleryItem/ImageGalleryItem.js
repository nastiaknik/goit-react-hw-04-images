import PropTypes from 'prop-types';
import { Image, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tag,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <GalleryItem onClick={openModal}>
      <Image
        src={smallImage}
        alt={tag}
        data-large={largeImage}
        loading="lazy"
        title="Click to enlarge"
        width="290px"
        height="190px"
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  tag: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};
