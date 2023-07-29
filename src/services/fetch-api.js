import axios from 'axios';
//
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37263495-0dc17f57687021d8824007ffe';

async function fetchData(searchQuery, page) {
  const params = new URLSearchParams({
    q: searchQuery,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    oreintation: 'horizontal',
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data.hits;
}

export { fetchData };
