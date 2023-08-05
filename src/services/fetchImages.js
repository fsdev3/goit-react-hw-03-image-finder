import axios from 'axios';

const API_KEY = '37263495-0dc17f57687021d8824007ffe';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(searchResult, pageNumber) {
  const searchParams = new URLSearchParams({
    q: searchResult,
    page: pageNumber,
    key: API_KEY,
    image_type: 'photo',
    oreintation: 'horizontal',
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return await response.data;
}

export { fetchImages };
