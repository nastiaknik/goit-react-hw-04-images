import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import { ThreeDots } from 'react-loader-spinner'; */
import { fetchPics } from './../utils/service-api';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [chosenImage, setChosenImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(isLoading => !isLoading);

    fetchPics(query, page)
      .then(data => {
        const results = data.hits.map(image => ({
          id: image.id,
          tag: image.tags,
          smallImage: image.webformatURL,
          largeImage: image.largeImageURL,
        }));

        setTotalResults(data.totalHits);

        if (!data.totalHits) {
          toast.error(
            <p>
              There are no images for{' '}
              <span style={{ color: '#e74c3c' }}>{query}</span>!
            </p>
          );
          return;
        }

        if (page === 1) {
          setImages(results);
          window.scrollTo({
            behavior: 'smooth',
            top: 0,
          });
          toast.success(
            <p>
              We found{' '}
              <span style={{ color: '#2E8B57', fontWeight: 600 }}>
                {data.totalHits}
              </span>{' '}
              {data.totalHits === 1 ? 'image' : 'images'} for{' '}
              <span style={{ color: '#2E8B57', fontWeight: 600 }}>{query}</span>
              !
            </p>
          );
        } else {
          setImages(prevState => [...prevState, ...results]);
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(isLoading => !isLoading));
  }, [query, page]);

  useEffect(() => {
    if (
      images.length === totalResults &&
      images.length > 0 &&
      totalResults > 0
    ) {
      toast.info("You've reached the end of search results.", {
        toastId: 'customId',
      });
    }
  }, [images, totalResults]);

  const onLoadMoreBtn = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onImageClick = event => {
    const url = event.target.dataset.large;
    const tag = event.target.alt;
    setChosenImages({ url, tag });
    setShowModal(showModal => !showModal);
  };

  const handleSubmit = string => {
    if (string === query) {
      return;
    }
    setQuery(string);
    setPage(1);
    setImages([]);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />

      {images.length ? (
        <ImageGallery images={images} openModal={onImageClick} />
      ) : null}

      {isLoading && <Loader />}

      {/* {isLoading && (<ThreeDots color="#303f9f" wrapperStyle={{ margin: '0 auto', display: 'flex', justifyContent: 'center', }} />)} */}

      {images.length < totalResults && !isLoading && (
        <Button text="Load more..." onLoadMore={onLoadMoreBtn} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={chosenImage.url} alt={chosenImage.tag} />
        </Modal>
      )}
      <ToastContainer newestOnTop={true} autoClose={3000} />
    </Layout>
  );
};
