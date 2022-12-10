import axios from 'axios';

export const fetchImages = async (searchImg, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '30573332-0a11d85a4e1507990835feb20';

  const { data } = await axios({
    method: 'get',
    url: `${BASE_URL}?key=${API_KEY}&q=${searchImg}`,
    params: {
      language: 'en-US',
      per_page: 12,
      page: page,
      orintation: 'horizontal',
      image_type: 'photo',
    },
  });

  const images = data.hits.map((image) => {
    return {
      id: image.id,
      largeImageURL: image.largeImageURL,
      webformatURL: image.webformatURL,
      tags: image.tags,
    };
  })

  return { images, totalHits: data.totalHits };
};
