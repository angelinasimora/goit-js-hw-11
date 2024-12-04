export const searchImage = search => {
  const searchParams = new URLSearchParams({
    key: '47412698-017a3cc161c8c283fa818e1a7',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Host: 'http://localhost:5173',
      Origin: 'https://pixabay.com/api',
    },
  };

  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};