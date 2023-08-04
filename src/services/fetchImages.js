import axios from 'axios';

export async function fetchImages(searchResult, pageNumber) {
  const searchParams = new URLSearchParams({
    key: '37263495-0dc17f57687021d8824007ffe',
    q: searchResult,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageNumber,
    per_page: 12,
  });

  const response = await axios.get('https://pixabay.com/api/?' + searchParams);
  return await response.data;
}
