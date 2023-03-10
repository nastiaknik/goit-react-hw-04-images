import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import { fetchPics } from './../utils/service-api';
import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalResults: 0,
    showModal: false,
    chosenImage: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      fetchPics(query)
        .then(data => {
          const results = data.hits.map(image => ({
            id: image.id,
            tag: image.tags,
            smallImage: image.webformatURL,
            largeImage: image.largeImageURL,
          }));
          if (data.totalHits !== 0) {
            toast.success(
              <p>
                We found{' '}
                <span style={{ color: '#2E8B57', fontWeight: 600 }}>
                  {data.totalHits}
                </span>{' '}
                {data.totalHits === 1 ? 'image' : 'images'} for{' '}
                <span style={{ color: '#2E8B57', fontWeight: 600 }}>
                  {query}
                </span>
                !
              </p>
            );
          }
          if (!data.totalHits) {
            toast.error(
              <p>
                There are no images for{' '}
                <span style={{ color: '#e74c3c' }}>{query}</span>!
              </p>
            );
          }
          return this.setState({
            page: 1,
            images: results,
            totalResults: data.totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      fetchPics(query, this.state.page)
        .then(data => {
          const results = data.hits.map(image => ({
            id: image.id,
            tag: image.tags,
            smallImage: image.webformatURL,
            largeImage: image.largeImageURL,
          }));

          return this.setState(({ images }) => {
            return {
              images: [...images, ...results],
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (
      this.state.images.length === this.state.totalResults &&
      this.state.images.length !== 0 &&
      this.state.totalResults !== 0
    ) {
      toast.info("You've reached the end of search results.", {
        toastId: 'customId',
      });
    }
  }

  searchSubmitHandler = query => {
    this.setState({ query });
  };

  onLoadMoreBtn = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onImageClick = event => {
    const url = event.target.dataset.large;
    const tag = event.target.alt;

    this.setState(({ showModal }) => ({
      showModal: !showModal,
      chosenImage: { url, tag },
    }));
  };

  render() {
    const { images, totalResults, isLoading, showModal, chosenImage } =
      this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.searchSubmitHandler} />

        {images && (
          <ImageGallery images={images} openModal={this.onImageClick} />
        )}

        {images.length < totalResults && (
          <Button text="Load more..." onLoadMore={this.onLoadMoreBtn} />
        )}

        {isLoading && (
          <ThreeDots
            color="#303f9f"
            wrapperStyle={{
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={chosenImage.url} alt={chosenImage.tag} />
          </Modal>
        )}
        <ToastContainer newestOnTop={true} autoClose={3000} />
      </Layout>
    );
  }
}
