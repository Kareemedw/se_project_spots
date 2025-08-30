// The Edit profile section for users to edit their profile.

const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editprofileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editprofileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});
editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.target.reset();
  editProfileModal.classList.remove("modal_is-opened");

  const inputValues = {
    name: editprofileNameInput.value,
    description: editprofileDescriptionInput.value,
  };
});

// The New post section for users to post a image and a caption on their profile.

const newPostButton = document.querySelector(".profile__button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPosteNameInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
newPostForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.target.reset();
  newPostModal.classList.remove("modal_is-opened");

  const inputValues = {
    name: newPostNameInput.value,
    description: newPostDescriptionInput.value,
  };
});
