import "./index.css";
import Api from "../scripts/Api.js";

import { setButtonText } from "../../utilis/helperFunction.js";

import {
  enableValidation,
  valdationConfig,
  disableBtn,
  resetValidation,
} from "../scripts/validation.js";

/*const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4be8bd2b-c512-4622-8acd-75a46994b671",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    currentUserId = user._id;
    getUserInfo(user);
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const previewCardModal = document.querySelector("#card-modal");
const previewCardImage = previewCardModal.querySelector(".modal__image");
const previewCardCaption = previewCardModal.querySelector(".modal__caption");

const closeButtons = document.querySelectorAll(".modal__close-btn");

const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-modal-form"];
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);

const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const editProfileName = document.querySelector(".profile__title-name");
const editProfileDescription = document.querySelector(
  ".profile__title-description",
);

const profileAvatar = document.querySelector(".profile__image");

const profileAbout = editProfileDescription;
const profileName = editProfileName;

const newPostButton = document.querySelector(".profile__button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = document.forms["new_post-modal-form"];
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const cardFormSubmit = document.querySelector(".modal__submit_btn");

const avatarModalButton = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = document.forms["edit-avatar-form"];
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const cancelModal = deleteModal.querySelector(".modal__submit_btn_cancel");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

let currentUserId;

function getUserInfo({ name, about, avatar, _id } = {}) {
  profileAbout.textContent = about;
  profileName.textContent = name;
  profileAvatar.src = avatar;
  currentUserId = _id;
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLikeCard(evt, id) {
  evt.preventDefault();
  const likeBtn = evt.currentTarget;
  const isLiked = likeBtn.classList.contains("card__content-image _active");

  api
    .handleLikes(id, isLiked)
    .then((updatedCard) => {
      const likedNow = updatedCard.likes?.some(
        (data) => data._id === currentUserId,
      );
      likeBtn.classList.toggle("card__content-image_active", likedNow);
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__content-name");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__content-image");
  //const cardLikeIcon = cardElement.querySelector(".card__content-image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const cardDeleteBtn = cardElement.querySelector(".card__delete-icon");
  cardDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  cardImage.addEventListener("click", function (e) {
    e.stopPropagation();
    previewCardImage.src = data.link;
    previewCardImage.alt = data.name;
    previewCardCaption.textContent = data.name;

    openModal(previewCardModal);
  });

  const isLiked = data.likes?.some((u) => u._id === currentUserId);
  cardLikeBtn.classList.toggle("card__content-image", isLiked);

  cardLikeBtn.addEventListener("click", (evt) => handleLikeCard(evt, data._id));
  cardDeleteBtn.addEventListener("click", (e) =>
    handleDeleteCard(cardElement, data._id),
  );

  return cardElement;
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      closeModal(editProfileModal);
      editProfileName.textContent = editProfileNameInput.value;
      editProfileDescription.textContent = editProfileDescriptionInput.value;
      disableBtn(cardFormSubmit);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .addCard({
      name: newPostCaptionInput.value,
      link: newPostLinkInput.value,
    })
    .then((data) => {
      disableBtn(cardFormSubmit);

      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      evt.target.reset();
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      disableBtn(cardFormSubmit);
      evt.target.reset();
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove(); // remove from page AFTER server confirms
      closeModal(deleteModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = editProfileName.textContent;
  editProfileDescriptionInput.value = editProfileDescription.textContent;
  openModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

avatarModalButton.addEventListener("click", function () {
  openModal(avatarModal);
});

cancelModal.addEventListener("click", function () {
  closeModal(deleteModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPostForm.addEventListener("submit", handleAddCardSubmit);

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

enableValidation(valdationConfig);
