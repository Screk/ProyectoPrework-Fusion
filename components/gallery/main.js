import { MOCK_CARDS } from './constants';
import './style.css'
//  SETUP
const appElement = document.querySelector('#gallery-container');

const getModalTemplate = () => `
  <div id="thepower-modal" class="thepower-modal">
    <div class ="modal-header">
      <h2 id="modal-title"></h2>
      <button id="modal-close">❌</button>
    </div>
    <div class="modal-body"></div>
  </div>
`;

getModalTemplate();

const getContainerTemplate = () => `
  <div id="thepower-gallery" class="thepower-gallery">
    <h1>Loading...⌚</h1>
  </div>
`;

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

// LOGIC
const galleryElement = document.querySelector("#thepower-gallery");
const loadingElement = document.querySelector("#thepower-gallery > h1");
const modalElement = document.querySelector("#thepower-modal");
const modalTitle = document.querySelector('#modal-title')
const modalBody = document.querySelector('.modal-body')

let currentCard;

const setupStars = (score) => {
  if (!score){
    return `<p class="no-rating">No rating</p>`
  }

  let starContainer = [];

  for (let i = 1; i < score; i++) {
    starContainer.push(`<span class="star">⭐</span>`);
  }
  return starContainer.join('');
};

const getCardTemplate = (card) => `
  <div class ="card" role="button" id="${card.id}">
    <h3>${card.name}</h3>

    <div class="image-container">
      <img src="${card.logo}" alt="${card.name}" />
    </div>

    <div class="score-container">${setupStars(card.score)}</div>

  </div>
`;

const setupCards = () => {
  loadingElement.remove();

  MOCK_CARDS.forEach(card => {
    const template = getCardTemplate(card)
    galleryElement.innerHTML += template;
  })
}
setupCards();

const getModalBodyTemplate = (cardData) => `
  <img src="${cardData.logo}" alt="${cardData.name}" />
  <h3>Valoración de ${cardData.score.toFixed(2)} con ${cardData.reviews} reviews</h3>
  <div class="review-container"> 
    <button data-score ="1">⭐</button>
    <button data-score ="2">⭐</button>
    <button data-score ="3">⭐</button>
    <button data-score ="4">⭐</button>
    <button data-score ="5">⭐</button>
  </div>
  <p>Clicka en una estrella para votar</p>
`;

const setUpModalData = (cardData) => {
  currentCard = cardData;
  modalTitle.innerText = cardData.name
  modalBody.innerHTML = getModalBodyTemplate(cardData)
}

const handleOpenModal = (event) => {
  const cardId = event.target.id
  const cardData = MOCK_CARDS.find((card) => card.id === cardId)
  setUpModalData(cardData)
  modalElement.style.display = 'block';
}

const addCardsListeners = () => {
  const cards = document.querySelectorAll('#thepower-gallery .card')
  cards.forEach((card) => card.addEventListener('click', handleOpenModal))
}

addCardsListeners();

const addModalListeners = () => {
  const closeButton = document.querySelector('#thepower-modal #modal-close')
  closeButton.addEventListener('click', () => {
    modalElement.style.display = 'none';
  });
};

addModalListeners();