import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { searchImage } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import errorIcon from './img/error.png';

const form = document.querySelector('.form');
const gallery = document.querySelector('ul.gallery');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.galery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

const createGalary = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.style.display = 'block';
  const searchText = e.target.elements.search.value.trim();

  if (searchText === '') {
    iziToast.error({
      iconUrl: errorIcon,
      iconColor: '#fff',
      imageWidth: 24,
      messageColor: '#fff',
      message: 'Please write a query for search',
    });
    gallery.innerHTML = '';
    loader.style.display = 'none';
    return;
  }

  searchImage(searchText)
    .then(({ hits }) => {
      gallery.innerHTML = '';
     

      const images = renderImages(hits);
      if (images) {
        loader.style.display = 'none';
      }

      if (hits.length === 0) {
        iziToast.error({
          iconUrl: errorIcon,
          iconColor: '#fff',
          imageWidth: 24,
          messageColor: '#fff',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        loader.style.display = 'none';
        gallery.innerHTML = '';
      }

      gallery.innerHTML = images;
      lightbox.refresh();
      form.reset();
    })
    .catch(error => {
      console.log(error);
      
      gallery.innerHTML = '';
      iziToast.error({
        iconUrl: errorIcon,
        iconColor: '#fff',
        imageWidth: 24,
        messageColor: '#fff',
        message: error,
      });
    });
};

form.addEventListener('submit', createGalary);