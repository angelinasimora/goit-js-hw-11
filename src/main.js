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

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

const createGallery = async (e) => {
  e.preventDefault();
  gallery.innerHTML = ''; // Очищення результатів виконується один раз.
  loader.style.display = 'block'; // Показуємо завантажувач.
  
  const searchText = e.target.elements.search.value.trim();

  if (!searchText) {
    iziToast.error({
      iconUrl: errorIcon,
      iconColor: '#fff',
      imageWidth: 24,
      messageColor: '#fff',
      message: 'Please write a query for search',
    });
    loader.style.display = 'none'; // Приховуємо завантажувач.
    return;
  }

  try {
    const { hits } = await searchImage(searchText);

    if (!hits.length) {
      iziToast.error({
        iconUrl: errorIcon,
        iconColor: '#fff',
        imageWidth: 24,
        messageColor: '#fff',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      const images = renderImages(hits);
      gallery.innerHTML = images; // Додаємо зображення до галереї.
      lightbox.refresh(); // Оновлюємо lightbox.
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      iconUrl: errorIcon,
      iconColor: '#fff',
      imageWidth: 24,
      messageColor: '#fff',
      message: 'An error occurred. Please try again later.',
    });
  } finally {
    loader.style.display = 'none'; // Завжди приховуємо завантажувач.
  }

  form.reset(); // Скидаємо форму.
};

form.addEventListener('submit', createGallery);
