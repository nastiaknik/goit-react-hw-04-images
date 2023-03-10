const KEY = '33148068-288d8cf5a7eea4ade7d0df17d';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchPics(query, page = 1) {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`
  ).then(response => {
    return response.json();
  });
}
