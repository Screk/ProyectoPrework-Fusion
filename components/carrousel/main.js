import { IMAGES } from './constants';
import './style.css';

// Setup
const appElement = document.querySelector('#carrousel-container')

const getCarrouselTemplate = () => `
  <div id="thePower-carrousel" class="thepower-carrousel">
    <ul class="scrollable-set"></ul>
    <div class="image-preview"></div>
  </div>
`;

appElement.innerHTML += getCarrouselTemplate();

// Logic
const scrollableSet = document.querySelector('.scrollable-set');
const imagePrevElement = document.querySelector('.image-preview');
let actualImageIndex = 0;
let imageInterval;

const getScrollableElementTemplate = (image, index) => `
  <li role ="button" class="clickable">
    <img id="image-${index}" src="${image.src}" alt="${image.alt}" />
  </li>
`

const setupScrollableSet = () => {
  IMAGES.forEach((image, index) => {
    const template = getScrollableElementTemplate(image, index)
    scrollableSet.innerHTML += template;
  });
}

const setupImagePreview = (src) => {
  imagePrevElement.style.backgroundImage = `url(${src})`;

  const selectedImage = document.querySelector(`img[src='${src}']`)
  const imageIndex = Number(selectedImage.id.split('-')[1]);
  actualImageIndex = imageIndex;
  //selectedImage.scrollIntoView({ behavior: 'smooth'});
  const scrollIndex = imageIndex - 1;

  scrollableSet.scrollBy({
    top: scrollIndex > 0 ? imageIndex * selectedImage.clientHeight : -scrollableSet.clientHeight,
    behavior: 'smooth'
  })
  resetCarrouselPreview();
}

const handleChangePreview = (event) => {
  const image = event.target.children[0]

  setupImagePreview(image.getAttribute('src'))

}

const resetCarrouselPreview = () => {
  clearInterval(imageInterval);
  setupCarrouselInterval()
}

const addScrollableListeners = () => {
  const scrollables = document.querySelectorAll('li.clickable');
  scrollables.forEach((scrollable) => {
    scrollable.addEventListener('click', handleChangePreview)
  })
}

const setupCarrouselInterval = () => {
  imageInterval = setInterval(() => {
    if (actualImageIndex === IMAGES.length - 1) {
      actualImageIndex = 0;
    } else {
      actualImageIndex += 1
    }

    setupImagePreview(IMAGES[actualImageIndex].src)
  }, 3000)
}


setupScrollableSet ();
setupImagePreview(IMAGES[0].src);
addScrollableListeners()
setupCarrouselInterval()