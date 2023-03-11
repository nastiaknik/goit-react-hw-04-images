import axios from 'axios';

export const fetchPics = async (query, page = 1) => {
  const KEY = '33148068-288d8cf5a7eea4ade7d0df17d';
  const BASE_URL = 'https://pixabay.com/api/';

  const result = await axios(BASE_URL, {
    params: {
      key: KEY,
      q: query,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });

  return result.data;
};
