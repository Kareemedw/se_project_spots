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
const editProfileName = document.querySelector(".profile__title-name");
const editprofileDescription = document.querySelector(
  ".profile__title-description"
);

editProfileButton.addEventListener("click", function () {
  editprofileNameInput.value = editProfileName.textContent;
  editprofileDescriptionInput.value = editprofileDescription.textContent;
  editProfileModal.classList.add("modal_is-opened");
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  editProfileModal.classList.remove("modal_is-opened");
  editProfileName.textContent = editprofileNameInput.value;
  editprofileDescription.textContent = editprofileDescriptionInput.value;
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// The New post section for users to post a image and a caption on their profile.

const newPostButton = document.querySelector(".profile__button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
/*const newPostName = document.querySelector(".");
const newPostLink = document.querySelector(".");*/

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  newPostModal.classList.remove("modal_is-opened");
  console.log(newPostLinkInput);
  console.log(newPostCaptionInput);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
